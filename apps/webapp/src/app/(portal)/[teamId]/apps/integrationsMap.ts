import { getUserData } from "@/utils/getUserData";

interface IIntegrationMap {
  integrations: {
    name: string;
    formattedName: string;
    slug: string;
    icon: string;
    description: string;
    status: string;
  }[];
  teamSlug: string;
}

export default async function integrationMap({
  integrations,
  teamSlug,
}: IIntegrationMap) {
  try {
    const integrationConnectionMap: any = {};

    // Fetching the User Data for App Connections status
    const userDetails = await getUserData({
      select: {
        id: true,
        teams: { select: { id: true, slug: true, name: true } },
        connections: {
          select: { id: true, appSlug: true, status: true, teamId: true },
        },
      },
    });

    const { teams = [], connections = [] } = userDetails || {};

    integrations.forEach((integration: any) => {
      integrationConnectionMap[integration.slug] = {
        ...integration,
        status: "not_connected",
      };
    });

    // Mapping the Connected app status based on the teamId
    teams?.forEach(({ id, slug }: { id: string; slug: string }) => {
      if (slug === teamSlug) {
        connections?.forEach((conn: any) => {
          if (conn.teamId === id) {
            integrationConnectionMap[conn.appSlug] = {
              ...integrations.find((i: any) => i.slug === conn.appSlug),
              status: conn.status || "not_connected",
            };
          }
        });
      }
    });

    const finalIntegrations = Object.values(integrationConnectionMap);

    return finalIntegrations;
  } catch (e) {
    console.log("Error in integrationMap", e);
    return integrations;
  }
}
