"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { get, isEmpty } from "lodash";

import { Button } from "@/ui/Buttons/SButton";
import { useSupabase } from "@/components/SupbaseProvider";
import DisconnectConnectionModal from "../DisconnectConnectionModal";
import zauth from "../zauth";

export default function Content({
  slug = "slack",
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
  const router = useRouter();
  const userSession: any = useSupabase();
  const userInfo = get(userSession, "session.user", {});

  const { name, connectionData, gettingStarted } =
    allIntegrations.find((i) => i.slug === slug) || {};
  const isConnected = !isEmpty(connectionData);

  const toggleDisconnectModal = () =>
    setShowDisconnectModal(!showDisconnectModal);

  const handleConnect = async () => {
    return await zauth.auth(slug, { ...userInfo, teamSlug, formId }, router);
  };

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
            onClick={handleConnect}
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
          <span>
            You will receive the submission notifications to{" "}
            <span className="font-semibold">
              {get(connectionData, "apiKeys.additionalData.channel", "")}
            </span>{" "}
            channel
          </span>
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
    </div>
  );
}
