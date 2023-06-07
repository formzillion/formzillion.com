import { PageProps } from "@/types/PageProps";
import Integrations, { IIntegration } from "../Integrations";
import integrationMap from "../integrationMap";
import Content from "./Content";
import UpgradePlan from "@/components/UpgradePlan";

export default async function ({ params }: PageProps) {
  const { teamId: teamSlug, formId } = params;

  const { finalIntegrations, plan, url } = (await integrationMap({
    teamSlug,
  })) as {
    finalIntegrations: IIntegration[];
    plan: any;
    url: any;
  };

  return (
    <div>
      {plan === "free" ? (
        <div className="flex justify-center">
          <UpgradePlan url={url} />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4 divide-x divide-gray-200">
          <div className="col-span-1">
            <Integrations
              teamSlug={teamSlug}
              integrations={finalIntegrations}
              formId={formId}
            />
          </div>
          <div className="col-span-4 pl-4">
            <Content
              teamSlug={teamSlug}
              formId={formId}
              allIntegrations={finalIntegrations}
            />
          </div>
        </div>
      )}
    </div>
  );
}
