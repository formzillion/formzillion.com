"use client";

import React, { useState } from "react";
import { get } from "lodash";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { GrConnect } from "react-icons/gr";
import { AiOutlineDisconnect } from "react-icons/ai";
import { useSupabase } from "@/components/SupbaseProvider";
import ActionMenu from "./ActionMenu";
import AddApiConfigModal from "./AddApiConfigModal";
import zauth from "./zauth";
import DisconnectConnectionModal from "./DisconnectConnectionModal";
import Link from "next/link";

interface IButtonProps {
  status: string;
  slug: string;
  onClickApp: (slug: string) => void;
  isAvailable?: boolean;
}

const ReconnectButton = ({ status }: IButtonProps) => {
  return (
    <div className="">
      {status === "connected" && (
        <div className="flex space-x-2 items-center">
          <CheckCircleIcon className="h-[22px] w-[22px] text-green-500" />
        </div>
      )}
    </div>
  );
};

export default function IntegrationItem({
  integration,
  teamSlug,
  formId,
}: {
  integration: any;
  teamSlug: string;
  formId: string;
}) {
  const { icon, name, status, slug, authType } = integration;
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toggleShowApiKeyModal = () => setShowApiKeyModal(!showApiKeyModal);
  const toggleDeleteConfirmModal = () =>
    setShowDeleteConfirmModal(!showDeleteConfirmModal);

  const userSession: any = useSupabase();
  const userInfo = get(userSession, "session.user", {});

  const handleConnect = async () => {
    if (authType === "oauth") {
      await zauth.auth(slug, { ...userInfo, teamSlug, formId }, router);
    } else {
      toggleShowApiKeyModal();
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    const disconnectResponse = await fetch("/api/connections/disconnect", {
      body: JSON.stringify({ teamSlug, slug }),
      method: "POST",
      cache: "no-cache",
    });
    await disconnectResponse.json();

    router.refresh();
    setIsLoading(false);
    toggleDeleteConfirmModal();
  };

  return (
    <div className="grid grid-cols-1 grid-flow-col items-center justify-between w-full">
      <Link href={`/${teamSlug}/${formId}/integrations/${slug}`}>
        <div className="flex items-center space-x-2">
          <div className="flex justify-center">
            <Image
              src={icon}
              alt={name}
              className="w-12 h-12 object-contain rounded p-3 text-white"
              width={100}
              height={100}
            />
          </div>
          <h3>{name}</h3>
          <ReconnectButton
            status={status}
            slug={slug}
            onClickApp={handleConnect}
          />
        </div>
      </Link>
      <ActionMenu
        items={[
          ...(status === "connected"
            ? [
                {
                  name: "Disconnect",
                  Icon: AiOutlineDisconnect,
                  onClick: toggleDeleteConfirmModal,
                },
                {
                  name: "Reconnect",
                  Icon: ArrowPathIcon,
                  onClick: handleConnect,
                },
              ]
            : [{ name: "Connect", onClick: handleConnect, Icon: GrConnect }]),
        ]}
      />
      {showApiKeyModal && (
        <AddApiConfigModal
          closeModal={toggleShowApiKeyModal}
          teamSlug={teamSlug}
          appName={name}
          appSlug={slug}
          formId={formId}
        />
      )}
      {showDeleteConfirmModal && (
        <DisconnectConnectionModal
          closeModal={toggleDeleteConfirmModal}
          handleDisconnect={handleDisconnect}
          isLoading={isLoading}
          appName={name}
        />
      )}
    </div>
  );
}
