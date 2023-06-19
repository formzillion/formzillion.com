"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { get, isEmpty, startCase } from "lodash";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/ui/Select";
import { Button } from "@/ui/Buttons/SButton";
import { showSuccessToast } from "@/ui/Toast/Toast";
import { useSupabase } from "@/components/SupbaseProvider";
import getTables from "@/app/fetch/integrations/airtable/getTables";
import createTask from "@/app/fetch/tasks/createTask";
import DisconnectConnectionModal from "../DisconnectConnectionModal";
import zauth from "../zauth";

const appSlug = "{name}";

export default function Content({
  teamSlug,
  formId,
  allIntegrations,
}: {
  teamSlug: string;
  formId: string;
  allIntegrations: any[];
}) {
  const [tables, setTables] = useState<any>([]);
  const [template, setTemplate] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const isTablesEmpty = isEmpty(tables);
  const router = useRouter();
  const userSession: any = useSupabase();
  const userInfo = get(userSession, "session.user", {});

  const { name, connectionData, config } =
    allIntegrations.find((i) => i.slug === appSlug) || {};

  const isConnected = !isEmpty(connectionData);

  const toggleDisconnectModal = () =>
    setShowDisconnectModal(!showDisconnectModal);

  const fetchTables = useCallback(async () => {
    const tablesResp = await getTables({
      teamSlug,
      connectionId: connectionData.id,
    });
    setTables(tablesResp);
  }, [teamSlug]);

  useEffect(() => {
    if (isTablesEmpty) {
      fetchTables();
    }
  }, [fetchTables]);

  const handleOnSave = async () => {
    if (!isTablesEmpty) {
      setIsLoading(true);
      await createTask({
        teamSlug,
        formId,
        template,
        appSlug,
        taskSlug: get(config, "actions.0", ""),
      });
      router.refresh();
      showSuccessToast("Task created successfully");
      setIsLoading(false);
    }
  };

  const handleConnect = async () => {
    return await zauth.auth(appSlug, { ...userInfo, teamSlug, formId }, router);
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
        <p className="my-2">
          To get you need to authorize Formzillion to access your {name}
          account. Once authorized, you can select the table you want to insert
          the submissions.
        </p>
        <br />
        Click on &quot;Connect {name}&quot; to connect your {name} account.
      </div>
      {!isEmpty(tables) && (
        <div>
          <div className="space-y-4 py-2 pb-4 flex justify-between items-center">
            <div>Select Table</div>
            <div className="w-[50%]">
              <Select
                onValueChange={(value) =>
                  setTemplate({ tables, tableId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tables?.map(({ label, value }: any) => {
                    return (
                      <SelectItem key={value} value={value}>
                        {startCase(label)}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            className="float-right mt-4 bg-orange-600 text-white rounded-none"
            onClick={handleOnSave}
            disabled={isTablesEmpty}
            isLoading={isLoading}
          >
            Save
          </Button>
        </div>
      )}
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
