import IntegrationItem from "./IntegrationItem";

interface IIntegationsProps {
  integrations: IIntegration[];
  teamSlug: string;
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

export default function Integrations({
  teamSlug,
  integrations,
}: IIntegationsProps) {
  return (
    <div>
      <h2>Integrations</h2>
      <section className="my-4">
        {integrations.map((integration) => (
          <div key={integration.slug} className="flex space-x-4 items-center">
            <IntegrationItem integration={integration} teamSlug={teamSlug} />
          </div>
        ))}
      </section>
    </div>
  );
}
