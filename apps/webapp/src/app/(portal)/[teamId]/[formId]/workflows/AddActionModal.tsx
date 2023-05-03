"use client";
import { useCallback, useEffect, useState } from "react";
import { isEmpty } from "lodash";

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

interface IAddActionModal {
  workflowId: number | string;
  teamSlug: string;
  closeModal: () => void;
  refreshGrid: () => void;
}

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
    workflowId: workflowId,
    type: "action",
    appId: "",
    connectionId: "",
    template: {},
  });

  const getAppsList = useCallback(async () => {
    const apps = await getApps();
    setAppsList(apps);
  }, []);

  const getConnectionsList = useCallback(async () => {
    const connections = await getConnections({
      appId: actionSetup.appId,
      teamSlug,
    });

    setTeamId(connections[0]?.teamId);
    setconnectionList(connections);
  }, [actionSetup.appId, teamSlug]);

  useEffect(() => {
    if (isEmpty(appsList)) {
      getAppsList();
    }

    if (actionSetup.appId) {
      const slug = appsList.find(
        (app: any) => app.id === actionSetup.appId
      )?.slug;
      setAppSlug(slug);
      getConnectionsList();
    }
  }, [actionSetup, appsList, getAppsList, getConnectionsList]);

  const handleOnSelect = (e: any) => {
    const { name, value } = e.target;
    setActionSetup({
      ...actionSetup,
      [name]: value,
    });
  };

  const handleAddAction = async () => {
    setLoading(true);
    const actionResp = await addTask({
      ...actionSetup,
      teamId,
      name: `${appSlug}Action`,
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

  return (
    <Dialog open={true} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Action</DialogTitle>
          <DialogDescription className="text-gray-600">
            Add action for the current workflow
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <label
              htmlFor="appId"
              className="block text-sm font-medium text-gray-700"
            >
              Select App
            </label>
            <select
              id="appId"
              name="appId"
              className="appearance-none w-full border h-[44px] dark:bg-black dark:border-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-gray-500 sm:text-sm dark:text-gray-200"
              onClick={(e: any) => handleOnSelect(e)}
            >
              {!isEmpty(appsList) &&
                appsList.map((app: any) => {
                  return (
                    <option key={app.id} value={app.id}>
                      {app.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {!isEmpty(connectionList) && (
            <div className="space-y-4 py-2 pb-4">
              <label
                htmlFor="connectionId"
                className="block text-sm font-medium text-gray-700"
              >
                Select Connection
              </label>
              <select
                id="connectionId"
                name="connectionId"
                className="appearance-none w-full border h-[44px] dark:bg-black dark:border-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-gray-500 sm:text-sm dark:text-gray-200"
                onClick={(e: any) => handleOnSelect(e)}
              >
                {connectionList.map((conn: any) => {
                  return (
                    <option key={conn.id} value={conn.id}>
                      {conn.name}
                    </option>
                  );
                })}
              </select>
            </div>
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
