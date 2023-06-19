"use client";
import { useCallback, useEffect, useState } from "react";
import { get, isEmpty, map, startCase } from "lodash";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/Dialog";
import Button from "@/ui/Buttons";
import getApps from "@/app/fetch/integrations/getApps";
import getConnections from "@/app/fetch/connections/getConnections";
import addTask from "@/app/fetch/tasks/addTask";
import { showSuccessToast } from "@/ui/Toast/Toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/ui/Select";
import { Input } from "@/ui/Input/SimpleInput";

import getTablesFromAirtable from "@/app/fetch/integrations/airtable/getTables";
import getTagsFromConvertkit from "@/app/fetch/integrations/convertkit/getTags";

interface IAddActionModal {
  workflowId: number | string;
  teamSlug: string;
  closeModal: () => void;
  refreshGrid: () => void;
}

const availableActionsMap: any = {
  mailerlite: ["addSubscriber"],
  sendgrid: ["sendThankyouEmail"],
  slack: ["sendNotification"],
  webhooks: ["postToWebhookEnpoint"],
  airtable: ["addRecord"],
  freshdesk: ["createTicket"],
  convertkit: ["addSubscriberToAForm"],
};

const taskTemplateConfig: any = {
  sendgrid: { fromEmail: "formEmail", name: "name" },
  airtable: { table: [] },
  convertkit: { tag: [] },
};

const AddActionModal = ({
  workflowId,
  teamSlug,
  closeModal,
  refreshGrid,
}: IAddActionModal) => {
  const [loading, setLoading] = useState(false);
  const [appsList, setAppsList] = useState<any>([]);
  const [connectionList, setconnectionList] = useState([]);
  const [appSlug, setAppSlug] = useState("");
  const [teamId, setTeamId] = useState("");
  const [actionSetup, setActionSetup] = useState({
    appId: "",
    connectionId: "",
    actionSlug: "",
  });
  const [template, setTemplate] = useState<any>({});
  const [taskTemplate, setTaskTemplate] = useState(
    taskTemplateConfig[appSlug] || {}
  );

  const availableActions = availableActionsMap[appSlug];
  const isConnectionsExists = !isEmpty(connectionList);
  const isAppsExists = !isEmpty(appsList);
  const isActionExists = !isEmpty(availableActions);

  const processAirtable = useCallback(async () => {
    if (!isEmpty(actionSetup.connectionId)) {
      if (appSlug === "airtable") {
        const tables = await getTablesFromAirtable({
          connectionId: actionSetup.connectionId,
        });

        setTaskTemplate({ table: tables });
      }
    }
  }, [actionSetup.connectionId, appSlug]);

  const processConvertkit = useCallback(async () => {
    if (!isEmpty(actionSetup.connectionId)) {
      if (appSlug === "convertkit") {
        const allTags = await getTagsFromConvertkit({
          connectionId: actionSetup.connectionId,
        });
        const tables = allTags.tags.map((tag: any) => ({
          label: tag.name,
          value: tag.id,
        }));
        setTaskTemplate({ tag: tables });
      }
    }
  }, [actionSetup.connectionId, appSlug]);

  const getAppsList = useCallback(async () => {
    const apps = await getApps();
    setAppsList(apps);
  }, []);

  const getConnectionsList = useCallback(
    async (slug: string) => {
      const connections = await getConnections({
        appSlug: slug,
        teamSlug,
      });

      setTeamId(get(connections, "0.teamId", ""));
      setconnectionList(connections);
    },
    [teamSlug]
  );

  useEffect(() => {
    if (isEmpty(appsList)) {
      getAppsList();
    }

    if (!isEmpty(actionSetup.appId)) {
      const slug = appsList.find(
        (app: { id: string }) => app.id.toString() === actionSetup.appId
      )?.slug;
      setAppSlug(slug);
      getConnectionsList(slug);
    }

    processConvertkit();
    processAirtable();
  }, [
    actionSetup.appId,
    appSlug,
    appsList,
    getAppsList,
    getConnectionsList,
    processConvertkit,
    processAirtable,
  ]);

  const handleOnSelect = (value: string, name: string) => {
    setActionSetup({
      ...actionSetup,
      [name]: value,
    });
  };

  const handleAddAction = async () => {
    setLoading(true);
    const actionSlug = actionSetup.actionSlug || get(availableActions, "0", "");
    const appId = actionSetup.appId || get(appsList, "0.id", "");
    const connectionId =
      actionSetup.connectionId || get(connectionList, "0.id", "");
    const actionResp = await addTask({
      workflowId,
      teamId,
      type: "action",
      appId,
      actionSlug,
      connectionId,
      appSlug,
      name: `${appSlug}_${actionSlug}`,
      template,
    });
    if (actionResp.success) {
      showSuccessToast("Action added successfully");
      closeModal();
    } else {
      showSuccessToast(actionResp.message);
    }
    refreshGrid();
    setLoading(false);
  };

  const handleTemplateConfig = (e: any, name: string) => {
    setTemplate({
      ...template,
      [name]: e.target.value,
    });
  };

  const handleCommonConfig = (value: any, name: string, tables: any) => {
    setTemplate({
      [`${name}Id`]: value,
      tables,
    });
  };

  return (
    <Dialog open={true} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Action</DialogTitle>
          <DialogDescription className="text-gray-700 dark:text-gray-400">
            Add action for the current workflow
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Select App
            </span>
            <Select
              defaultValue={actionSetup.appId}
              onValueChange={(value) => handleOnSelect(value, "appId")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select App" />
              </SelectTrigger>
              <SelectContent>
                {isAppsExists &&
                  appsList.map((app: any) => {
                    return (
                      <SelectItem key={app.id} value={app.id.toString()}>
                        {app.name}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </div>
          {isConnectionsExists && (
            <div className="space-y-4 py-2 pb-4">
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Select Connection
              </span>
              <Select
                defaultValue={actionSetup.connectionId}
                onValueChange={(value) => handleOnSelect(value, "connectionId")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Connection" />
                </SelectTrigger>
                <SelectContent>
                  {connectionList.map((conn: any) => {
                    return (
                      <SelectItem key={conn.id} value={conn.id.toString()}>
                        {conn.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          )}
          {isConnectionsExists && isActionExists && (
            <div className="space-y-4 py-2 pb-4">
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Select Action
              </span>
              <Select
                defaultValue={actionSetup.actionSlug}
                onValueChange={(value) => handleOnSelect(value, "actionSlug")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Action" />
                </SelectTrigger>
                <SelectContent>
                  {availableActions.map((action: any) => {
                    return (
                      <SelectItem key={action} value={action}>
                        {startCase(action)}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          )}
          {isConnectionsExists && isActionExists && !isEmpty(taskTemplate) && (
            <>
              {map(taskTemplate, (templateField: any, templateFieldKey) => (
                <div className="space-y-4 py-2 pb-4">
                  {typeof templateField === "string" && (
                    <>
                      <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Enter {startCase(templateFieldKey)}
                      </span>
                      <Input
                        type="text"
                        name={templateFieldKey}
                        id={templateFieldKey}
                        autoComplete={templateFieldKey}
                        value={template[templateFieldKey] || ""}
                        onChange={(e) =>
                          handleTemplateConfig(e, templateFieldKey)
                        }
                        required
                      />
                    </>
                  )}
                  {templateField?.length > 0 && (
                    <>
                      {!isEmpty(templateField) && (
                        <div className="space-y-4 py-2 pb-4">
                          <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Select {startCase(templateFieldKey)}
                          </span>
                          <Select
                            onValueChange={(value) =>
                              handleCommonConfig(
                                value,
                                templateFieldKey,
                                templateField
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={`Select ${startCase(
                                  templateFieldKey
                                )}`}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {templateField?.map(({ label, value }: any) => {
                                return (
                                  <SelectItem key={value} value={value}>
                                    {startCase(label)}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
        <DialogFooter>
          <Button
            className="bg-orange-600 text-white rounded-none"
            loading={loading}
            onClick={handleAddAction}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddActionModal;
