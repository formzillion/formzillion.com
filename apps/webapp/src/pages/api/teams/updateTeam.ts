import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import getUserSession from "../userSession/getUserSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { teamName, teamSlug, type, avatar } = req.body;
    const { currentUser } = await getUserSession(req, res);

    let updatedTeam;
    switch (type) {
      case "updateName":
        updatedTeam = await updateTeamName(teamSlug, teamName);
        break;
      case "updateSlug":
        updatedTeam = await updateTeamSlug(teamSlug, teamName);
        break;
      case "leaveTeam":
        updatedTeam = await leaveTeam(teamSlug, currentUser.id);
        break;
      case "deleteTeam":
        updatedTeam = await deleteTeam(teamSlug);
        break;
      case "removeMember":
        updatedTeam = await removeMember(teamSlug, teamName);
        break;
      case "deleteAccount":
        updatedTeam = await deleteAccount(teamSlug, currentUser.id);
        break;
      case "changeAvatar":
        updatedTeam = await updateAvatar(teamSlug, avatar);
        break;
      default:
        throw new Error("Invalid operation type");
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
  const res = await prisma.memberships.deleteMany({
    where: {
      AND: [{ userId: userId }, { teamId: teamSlug }],
    },
  });
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
  const team: any = await prisma.teams.findUnique({
    where: {
      slug: teamSlug,
    },
    include: {
      forms: true,
    },
  });
  await prisma.forms.deleteMany({
    where: {
      teamId: team.id,
    },
  });
  return await prisma.teams.delete({
    where: {
      slug: teamSlug,
    },
  });
}

async function deleteAccount(teamSlug: string, userId: string) {
  const team: any = await prisma.teams.findUnique({
    where: {
      slug: teamSlug,
    },
    include: {
      forms: true,
    },
  });
  await prisma.forms.deleteMany({
    where: {
      teamId: team.id,
    },
  });
  await prisma.users.delete({
    where: {
      id: userId,
    },
  });
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

async function updateAvatar(teamSlug: string, avatar: string) {
  return await prisma.teams.update({
    where: { slug: teamSlug },
    data: {
      avatar: avatar,
    },
  });
}
