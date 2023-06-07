import prisma from "@/lib/prisma";
import { getTeamDetails } from "@/utils/getTeamDetails";
import { integrations } from "@/utils/integrations.constants";
import { get } from "lodash";

interface IIntegrationMap {
  teamSlug: string;
}

export default async function integrationMap({ teamSlug }: IIntegrationMap) {
  try {
    const integrationConnectionMap = {} as { [key: string]: any };

    const connections = await prisma.connections.findMany({
      where: {
        team: {
          slug: teamSlug,
        },
      },
      select: {
        appSlug: true,
        appId: true,
        status: true,
        apiKeys: true,
        id: true,
      },
    });

    integrations.forEach((integration: any) => {
      integrationConnectionMap[integration.slug] = {
        ...integration,
        status: "not_connected",
        connectionData: {},
      };
    });

    // Mapping the Connected app status based on the teamId
    connections?.forEach((conn: any) => {
      integrationConnectionMap[conn.appSlug] = {
        ...integrations.find((i: any) => i.slug === conn.appSlug),
        status: conn.status || "not_connected",
        connectionData: conn,
      };
    });

    const finalIntegrations = Object.values(integrationConnectionMap);

    const teams = await prisma.teams.findUnique({
      where: {
        slug: teamSlug,
      },
      select: {
        slug: true,
        name: true,
        planName: true,
        type: true,
      },
    });
    const { plan, url } = getTeamDetails(get(teams, "0", {}));

    return { finalIntegrations, plan, url };
  } catch (e) {
    console.log("Error in integrationMap", e);
    return integrations;
  }
}
