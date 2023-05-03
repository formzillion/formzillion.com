import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import getUserSession from "../userSession/getUserSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { teamName, teamSlug, type, userId } = req.body;
    const { currentUser } = await getUserSession(req, res);

    let updatedTeam;
    if (type === "updateName") {
      updatedTeam = await updateTeamName(teamSlug, teamName);
    } else if (type === "updateSlug") {
      updatedTeam = await updateTeamSlug(teamSlug, teamName);
    } else if (type === "leaveTeam") {
      updatedTeam = await leaveTeam(teamSlug, currentUser.id);
    } else if (type === "deleteTeam") {
      updatedTeam = await deleteTeam(teamSlug);
    } else if (type === "removeMember") {
      updatedTeam = await removeMember(teamSlug, teamName);
    }

    res.status(201).json({ success: true, data: updatedTeam });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

async function updateTeamName(teamSlug: string, teamName: string) {
  return await prisma.teams.update({
    where: { slug: teamSlug },
    data: {
      name: teamName,
    },
  });
}

async function updateTeamSlug(teamSlug: string, newSlug: string) {
  return await prisma.teams.update({
    where: { slug: teamSlug },
    data: {
      slug: newSlug,
    },
  });
}

async function leaveTeam(teamSlug: string, userId: string) {
  return await prisma.teams.update({
    where: { slug: teamSlug },
    data: {
      users: {
        disconnect: [{ id: userId }],
      },
    },
  });
}

async function deleteTeam(teamSlug: string) {
  return await prisma.teams.delete({
    where: {
      slug: teamSlug,
    },
  });
}

async function removeMember(teamSlug: string, teamName: string) {
  const updatedTeam = await prisma.teams.update({
    where: { slug: teamSlug },
    data: {
      users: {
        disconnect: { id: teamName },
      },
    },
  });

  return await prisma.memberships.deleteMany({
    where: { teamId: updatedTeam.id, userId: teamName },
  });
}
