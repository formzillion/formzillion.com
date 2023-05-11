"use client";

import React, { useState } from "react";
import Image from "next/image";
import { startCase } from "lodash";
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useSupabase } from "@/components/SupbaseProvider";
import { Card, CardContent } from "@/ui/Card/SCard";
import Button from "@/ui/Buttons";
import zauth from "./zauth";
import AddApiConfigModal from "./AddApiConfigModal";

interface IButtonProps {
  status: string;
  slug: string;
  onClickApp: (slug: string) => void;
  isAvailable?: boolean;
}

const ConnectButton = ({
  status,
  slug,
  onClickApp,
  isAvailable,
}: IButtonProps) => {
  return (
    <div className="flex justify-center">
      {!isAvailable ? (
        <button
          className="flex flex-row items-center justify-center dark:text-white border border-gray-600 w-[179px] h-[48px] cursor-default rounded-none"
          disabled
        >
          Coming Soon
        </button>
      ) : status === "connected" ? (
        /* Using native button as for Button component bg-color is not overwritting. */
        <button
          className="flex flex-row items-center justify-center dark:text-white border border-green-600 w-[179px] h-[48px] cursor-default rounded-none"
          disabled
        >
          <CheckCircleIcon className="h-6 w-6 text-green-500 mr-1" />
          <span className="dark:text-white">{startCase(status)}</span>
        </button>
      ) : (
        <Button
          className="flex flex-row items-center rounded-none w-[179px] h-[48px]"
          onClick={() => onClickApp(slug)}
        >
          Connect
        </Button>
      )}
    </div>
  );
};

const ReconnectButton = ({ status, slug, onClickApp }: IButtonProps) => {
  return (
    <div className="flex justify-end mt-4 ml-2 w-full h-6">
      {status === "connected" && (
        <ArrowPathIcon
          className="h-[24px] w-[24px] cursor-pointer"
          onClick={() => onClickApp(slug)}
        />
      )}
    </div>
  );
};

const LogoAndDescription = ({
  name,
  description,
  icon,
}: {
  name: string;
  description: string;
  icon: string;
}) => {
  return (
    <>
      <div className="flex justify-center">
        <Image
          src={icon}
          alt={name}
          className="w-16 h-16 object-contain rounded p-3 my-2 text-white"
          width={100}
          height={100}
        />
      </div>

      <div className="mt-2 text-center">{name}</div>
      <p className="text-sm w-full my-4 min-h-[75px]">{description}</p>
    </>
  );
};

export default function IntegrationItem({ integration, teamSlug }: any) {
  const { icon, name, description, status, slug, authType, isAvailable } =
    integration;
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const toggleShowApiKeyModal = () => setShowApiKeyModal(!showApiKeyModal);

  const { session }: any = useSupabase();
  const user = session?.user || {};

  const onClickApp = (provider: string) => {
    if (authType === "oauth") {
      zauth.auth(provider, {
        ...user,
        teamId: teamSlug,
      });
    } else {
      toggleShowApiKeyModal();
    }
  };

  return (
    <div className="w-[256px] h-[336px] mb-4 mx-auto sm:mx-auto md:mx-auto lg:mx-auto">
      <Card className="w-full h-[336px] sm:w-full sm:h-[336px] md:w-full md:h-[336px] lg:w-[256px] lg:h-[336px] mx-auto  sm:space-x-2 ">
        <CardContent className="h-[336px] dark:text-white">
          <ReconnectButton
            status={status}
            slug={slug}
            onClickApp={onClickApp}
          />
          <LogoAndDescription
            description={description}
            icon={icon}
            name={name}
          />
          <ConnectButton
            slug={slug}
            onClickApp={onClickApp}
            status={status}
            isAvailable={isAvailable}
          />
        </CardContent>
      </Card>
      {showApiKeyModal && (
        <AddApiConfigModal
          closeModal={toggleShowApiKeyModal}
          teamSlug={teamSlug}
          appName={name}
          appSlug={slug}
        />
      )}
    </div>
  );
}
