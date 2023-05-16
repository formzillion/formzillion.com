import prisma from "@/lib/prisma";

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
      },
    });

    integrations.forEach((integration: any) => {
      integrationConnectionMap[integration.slug] = {
        ...integration,
        status: "not_connected",
      };
    });

    // Mapping the Connected app status based on the teamId
    connections?.forEach((conn: any) => {
      integrationConnectionMap[conn.appSlug] = {
        ...integrations.find((i: any) => i.slug === conn.appSlug),
        status: conn.status || "not_connected",
      };
    });

    const finalIntegrations = Object.values(integrationConnectionMap);

    return finalIntegrations;
  } catch (e) {
    console.log("Error in integrationMap", e);
    return integrations;
  }
}
