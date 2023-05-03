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
      select: { id: true, teams: { select: { id: true, slug: true } } },
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

    /* Finding the team for teamSlug */
    const team = user?.teams.find(
      ({ slug }: { slug: string }) => slug === teamSlug
    );

    if (!team) {
      return {
        success: false,
        message: `Team not found! for slug: ${teamSlug} and email: ${email}`,
      };
    }

    /* Checking for existing connection */
    const existingConnId = await prisma.connections.findFirst({
      where: {
        email: email,
        userId: user?.id,
        appId: app?.id,
        teamId: team.id,
        appSlug: appSlug,
      },
      select: {
        id: true,
      },
    });

    return {
      success: true,
      teamId: team.id,
      userId: user?.id,
      appId: app?.id,
      connectionId: existingConnId?.id,
    };
  } catch (error) {
    console.log(`Error in callBackHelper: ${error}`);

    return {
      success: false,
      message: `Error occured while fetching the required data: ${error}`,
    };
  }
}
