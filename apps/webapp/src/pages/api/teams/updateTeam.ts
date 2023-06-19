import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import getUserSession from "../userSession/getUserSession";
import { notifyOnSlack } from "@/utils/notifyOnSlack";

enum Role {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER", //Right = 4
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { teamName, teamSlug, type, avatar, role } = req.body;
    console.log(teamName, teamSlug, type, avatar);
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
        updatedTeam = await deleteTeam(teamSlug, currentUser.email);
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
      case "roleChange":
        updatedTeam = await roleChange(teamName, teamSlug, role);
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
  if (teamSlug && userId) {
    await prisma.memberships.deleteMany({
      where: {
        AND: [{ userId: userId }, { teamId: teamSlug }],
      },
    });
  }
  return await prisma.teams.update({
    where: { slug: teamSlug },
    data: {
      users: {
        disconnect: [{ id: userId }],
      },
    },
  });
}

async function deleteTeam(teamSlug: string, userEmail: string) {
  const team: any = await prisma.teams.findUnique({
    where: {
      slug: teamSlug,
    },
    include: {
      forms: true,
    },
  });
  if (team.id) {
    await prisma.forms.deleteMany({
      where: {
        teamId: team.id,
      },
    });
  }

  notifyOnSlack(
    "Deleted Team",
    `*User Deleted Team*\n
        User Email: ${userEmail}\n
        Team Slug: ${team.slug}\n
        Plan Name: ${team.planName}\n`
  );

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
  if (team.id) {
    await prisma.forms.deleteMany({
      where: {
        teamId: team.id,
      },
    });
  }
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

  if (updatedTeam.id) {
    // get current member count
    const currentMemberCount: any = await prisma.plan_metering.findFirst({
      where: { teamId: updatedTeam.id },
      select: {
        memberCounter: true,
        id: true,
      },
    });

    // decrement current member count
    await prisma.plan_metering.update({
      where: { id: currentMemberCount.id },
      data: { memberCounter: currentMemberCount.memberCounter - 1 },
    });

    return await prisma.memberships.deleteMany({
      where: { teamId: updatedTeam.id, userId: teamName },
    });
  } else {
    return;
  }
}

async function updateAvatar(teamSlug: string, avatar: string) {
  return await prisma.teams.update({
    where: { slug: teamSlug },
    data: {
      avatar: avatar,
    },
  });
}

async function roleChange(teamName: string, teamSlug: string, role: Role) {
  return await prisma.memberships.update({
    where: { userId_teamId: { teamId: teamName, userId: teamSlug } },
    data: { role },
  });
}
