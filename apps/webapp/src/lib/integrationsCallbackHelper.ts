import { get } from "lodash";
import prisma from "@/lib/prisma";

interface ICallBackHeler {
  email: string;
  appSlug: string;
  teamSlug: string;
}

interface IUser {
  id: string;
  teams: {
    id: string;
    slug: string;
  }[];
}

export default async function callBackHelper({
  email,
  appSlug,
  teamSlug,
}: ICallBackHeler) {
  try {
    /* Fetching the user details and associated teams for email */
    const user = (await prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        teams: { where: { slug: teamSlug }, select: { id: true, slug: true } },
      },
    })) as IUser;

    if (!user) {
      return { success: false, message: `User not found! for email: ${email}` };
    }

    /* Fetching the app Id for appSlug */
    const app = await prisma.apps.findFirst({
      where: { slug: appSlug },
      select: { id: true },
    });

    if (!app) {
      return { success: false, message: `App not found! for slug: ${appSlug}` };
    }

    const teamId = get(user, "teams.0.id", "");

    if (!teamId) {
      return {
        success: false,
        message: `Team not found! for slug: ${teamSlug} and email: ${email}`,
      };
    }

    /* Checking for existing connection */
    const existingConnId = await prisma.connections.findFirst({
      where: {
        teamId: teamId,
        email: email,
        appId: app?.id,
        appSlug: appSlug,
      },
      select: {
        id: true,
      },
    });

    console.log(`${appSlug} Connection existingConnId: `, existingConnId);

    return {
      success: true,
      teamId: teamId,
      userId: user?.id,
      appId: app?.id,
      connectionId: existingConnId?.id,
    };
  } catch (error: any) {
    console.log(`Error in callBackHelper: ${error}`);

    return {
      success: false,
      message: `Error occured while fetching the required data: ${error.message}`,
    };
  }
}
