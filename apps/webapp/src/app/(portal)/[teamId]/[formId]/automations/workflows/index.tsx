"use client";
import { useCallback, useEffect, useState } from "react";
import { isEmpty, startCase } from "lodash";
import {
  ArrowDownIcon,
  PlusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

import MenuCard from "@/components/MenuCard";
import { MenuItemProps } from "@/components/MenuCard/MenuItem";
import FzLoader from "@/components/FzLoader";

import getWorkflow from "@/app/fetch/workflows/getWorkflow";
import updateStatus from "@/app/fetch/tasks/updateStatus";
import getTasks from "@/app/fetch/tasks/getTasks";

import AddActionModal from "./AddActionModal";
import * as appImages from "./appImages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { Button } from "@/ui/Buttons/SButton";

const imageSrcMap: any = appImages;

interface IWorkflow {
  id?: number;
  name?: string;
  status?: string;
  formId?: string;
  userId?: string;
  teamId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ITask {
  id?: number;
  name?: string;
  type?: string;
  status?: string;
  workflowId?: number;
  connectionId?: string;
  createdAt?: string;
  updatedAt?: string;
}

// TODO: Make this a Common Component once all the required sections has implemented
const ActionMenu = ({
  title,
  menuItems,
}: {
  title?: string;
  menuItems: MenuItemProps[];
}) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"withText"} className="px-2 py-1 min-w-max">
            <div className={`${title && "ml-2"}`}>{title}</div>
            <EllipsisHorizontalIcon className="mx-2 h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {menuItems.map((item, idx) => (
            <div key={item.text}>
              <DropdownMenuItem onSelect={item.onClick}>
                {item.text}
              </DropdownMenuItem>
              {idx !== 0 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const TaskCard = ({ details, handleActionOnClick }: any) => {
  const { type, appSlug, slug: actionName } = details;
  const isAction = type === "action";
  const imageSrc = imageSrcMap[appSlug];

  return (
    <div className="my-2 py-2 px-4 border-2 dark:border-gray-800 flex flex-row items-center space-x-4 w-full">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={appSlug}
          className="h-12 w-12 object-contain"
        />
      )}
      <div className="flex items-center justify-between py-4 w-full">
        <div className="flex flex-row justify-between w-full">
          <div>
            <section
              id="actionType"
              className="text-sm font-medium text-gray-900 dark:text-white"
            >
              {isAction ? "Action" : "Trigger"}
            </section>
            <section
              id="actionName"
              className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1"
            >
              {`${startCase(appSlug)} - ${startCase(actionName)}`}
            </section>
          </div>
          <section>
            {appSlug !== "formzillion" && (
              <ActionMenu
                menuItems={[
                  {
                    text: "Delete",
                    onClick: () => handleActionOnClick(details),
                  },
                ]}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

const Workflows = ({
  teamSlug,
  formId,
}: {
  teamSlug: string;
  formId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<IWorkflow>({});
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [submissionCount, setSubmissionCount] = useState("0");
  const [refreshGrid, setRefreshGrid] = useState(false);
  const [showAddActionModal, setShowAddActionModal] = useState(false);

  const handleRefreshGrid = () => setRefreshGrid(!refreshGrid);
  const toggleAddActionModal = () => setShowAddActionModal(!showAddActionModal);

  const getWorkflowAndTasks = useCallback(async () => {
    setLoading(true);
    const workflowDetails = await getWorkflow({ formId });
    const { workflow, submissionCount } = workflowDetails || {};
    setDetails(workflow);
    setSubmissionCount(submissionCount);

    if (workflow) {
      const tasksList: any = await getTasks({ workflowId: workflow?.id });
      setTasks(tasksList);
    }
    setLoading(false);
  }, [formId]);

  useEffect(() => {
    getWorkflowAndTasks();
  }, [getWorkflowAndTasks, refreshGrid]);

  const handleActionOnClick = async (task: ITask) => {
    setLoading(true);
    await updateStatus({
      taskId: task.id,
      status: task.status === "active" ? "inActive" : "active",
    });
    handleRefreshGrid();
    setLoading(false);
  };

  const actionMenuItems: MenuItemProps[] = [
    {
      text: "Add Action",
      icon: <PlusIcon className="h-6 w-6" />,
      onClick: toggleAddActionModal,
    },
  ];

  return (
    <div>
      <h4 className="flex flex-row justify-between items-center mb-2">
        <div className="space-x-3">
          <div className="text-sm">
            Submissions <span className="">{submissionCount}</span>
          </div>
        </div>
        <MenuCard
          menuItems={actionMenuItems}
          title="Actions"
          icon={<ChevronDownIcon className="h-6 w-6 text-gray-700" />}
        />
      </h4>
      {!isEmpty(details) && (
        <div>
          <TaskCard
            details={{
              slug: "newFormSubmission",
              appSlug: "formzillion",
              status: "active",
              type: "trigger",
            }}
          />
          {!isEmpty(tasks) &&
            tasks.map((task: any) => {
              return (
                <div key={task?.id}>
                  <div className="flex justify-center">
                    <ArrowDownIcon className="h-8 w-8" />
                  </div>
                  <TaskCard
                    details={task}
                    handleActionOnClick={handleActionOnClick}
                  />
                </div>
              );
            })}
        </div>
      )}
      {loading && <FzLoader />}
      {showAddActionModal && (
        <AddActionModal
          workflowId={details?.id || ""}
          teamSlug={teamSlug}
          closeModal={toggleAddActionModal}
          refreshGrid={handleRefreshGrid}
        />
      )}
    </div>
  );
};

export default Workflows;
