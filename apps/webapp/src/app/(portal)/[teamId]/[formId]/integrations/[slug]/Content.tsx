"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { get, isEmpty } from "lodash";
import { Button } from "@/ui/Buttons/SButton";

import AddApiConfigModal from "../AddApiConfigModal";
import DisconnectConnectionModal from "../DisconnectConnectionModal";

export default function Content({
  slug,
  teamSlug,
  formId,
  allIntegrations,
}: {
  slug: string;
  teamSlug: string;
  formId: string;
  allIntegrations: any[];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const router = useRouter();

  const {
    name,
    config = {},
    connectionData = {},
    additionalInfo = "",
    gettingStarted = "",
  } = allIntegrations.find((i) => i.slug === slug) || {};

  const isConnected = !isEmpty(connectionData);
  /* Generate custom description */
  let customDesc = "";
  if (additionalInfo !== "") {
    config?.apiConfig?.forEach(
      (v: string) =>
        (customDesc = additionalInfo.replace(
          `{${v}}`,
          get(connectionData, `apiKeys.${v}`, "")
        ))
    );
  }

  const toggleDisconnectModal = () =>
    setShowDisconnectModal(!showDisconnectModal);
  const toggleConnectModal = () => setShowConnectModal(!showConnectModal);

  const handleDisconnect = async () => {
    setIsLoading(true);
    const disconnectResponse = await fetch("/api/connections/disconnect", {
      body: JSON.stringify({ connectionId: connectionData.id }),
      method: "POST",
      cache: "no-cache",
    });
    await disconnectResponse.json();

    setIsLoading(false);
    router.refresh();
    toggleDisconnectModal();
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="text-lg">{name} Integration</h2>
        {!isConnected ? (
          <Button
            className="text-green-500 border border-green-500 rounded-none"
            onClick={toggleConnectModal}
          >
            Connect {name}
          </Button>
        ) : (
          <Button
            className="text-red-500 border border-red-500 rounded-none"
            onClick={toggleDisconnectModal}
          >
            Disconnect {name}
          </Button>
        )}
      </div>
      <div className="py-4">
        <h3>Getting Started</h3>
        <p className="my-2">{gettingStarted}</p>
        <br />
        {!isConnected ? (
          <span>
            Click on &quot;Connect {name}&quot; to connect your {name} account.
          </span>
        ) : (
          <span>{customDesc}</span>
        )}
      </div>
      {showDisconnectModal && (
        <DisconnectConnectionModal
          appName={name}
          closeModal={toggleDisconnectModal}
          handleDisconnect={handleDisconnect}
          isLoading={isLoading}
        />
      )}
      {showConnectModal && (
        <AddApiConfigModal
          appName={name}
          appSlug={slug}
          formId={formId}
          teamSlug={teamSlug}
          closeModal={toggleConnectModal}
        />
      )}
    </div>
  );
}
