import IntegrationItem from "./IntegrationItem";

interface IIntegrationsProps {
  integrations: IIntegration[];
  teamSlug: string;
  formId: string;
  [key: string]: any;
}

export interface IIntegration {
  name: string;
  formattedName: string;
  slug: string;
  icon: string;
  description: string;
  status: string;
  authType: string;
  isAvailable: boolean;
}

export default function Integrations(data: IIntegrationsProps) {
  const { integrations, teamSlug, formId } = data;
  return (
    <div>
      <h2>Integrations</h2>
      <section className="my-4">
        {integrations.map((integration) => (
          <div key={integration.slug} className="flex space-x-4 items-center">
            <IntegrationItem
              integration={integration}
              teamSlug={teamSlug}
              formId={formId}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
