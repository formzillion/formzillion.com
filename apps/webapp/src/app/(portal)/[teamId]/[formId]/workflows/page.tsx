"use client";
import { useCallback, useEffect, useState } from "react";
import { isEmpty, startCase } from "lodash";
import {
  ArrowDownIcon,
  PlusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import { PageProps } from "@/types/PageProps";
import MenuCard from "@/components/MenuCard";
import { MenuItemProps } from "@/components/MenuCard/MenuItem";

import getWorkflow from "@/app/fetch/workflows/getWorkflow";
import updateStatus from "@/app/fetch/tasks/updateStatus";
import getTasks from "@/app/fetch/tasks/getTasks";
import getFormSubmissionCount from "@/app/fetch/formSubmissions/getFormSubmissionCount";

import SwitchGroup from "../settings/SwitchGroup";
import AddActionModal from "./AddActionModal";
import FzLoader from "@/components/FzLoader";

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

const Workflows = ({ params }: PageProps) => {
  const { formId, teamId: teamSlug } = params;
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

  const { status = "in-active", name = "My form" } = details || {};

  const handleActionOnClick = async (value: boolean, task: ITask) => {
    setLoading(true);
    await updateStatus({
      taskId: task.id,
      status: value ? "active" : "inActive",
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
          icon={<ChevronDownIcon className="h-6 w-6" />}
        />
      </h4>
      {!isEmpty(details) && (
        <div>
          <div className="my-2 py-2 px-4 border-2 dark:border-gray-800">
            <SwitchGroup
              label={"When new form submission is received"}
              checked={status === "active" ? true : false}
              description="Perform the below actions when new form submission is received."
              onChange={() => console.log("")}
              showSwitch={false}
            />
          </div>
          {!isEmpty(tasks) &&
            tasks.map((task: any) => {
              const actionName = startCase(task.name);
              return (
                <div key={task?.id}>
                  <div className="flex justify-center">
                    <ArrowDownIcon className="h-8 w-8" />
                  </div>
                  <div className="my-2 py-2 px-4 border-2 dark:border-gray-800 border-gray-200 rounded">
                    <SwitchGroup
                      key={`action_${task.id}`}
                      label={actionName}
                      checked={task.status === "active" ? true : false}
                      description={`Will perform ${actionName} when new form submission is received.`}
                      onChange={(e: any) => handleActionOnClick(e, task)}
                    />
                  </div>
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
