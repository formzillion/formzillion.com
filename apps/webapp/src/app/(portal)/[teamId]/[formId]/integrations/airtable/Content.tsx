"use client";
import { useCallback, useEffect, useState } from "react";
import { get, isEmpty, startCase } from "lodash";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/ui/Select";
import { Button } from "@/ui/Buttons/SButton";
import { integrationsConfig } from "@/utils/integrations.constants";
import getTables from "@/app/fetch/integrations/airtable/getTables";
import createTask from "@/app/fetch/tasks/createTask";

const appSlug = "airtable";
const config = integrationsConfig[appSlug];

export default function Content({
  teamSlug,
  formId,
}: {
  teamSlug: string;
  formId: string;
}) {
  const [tables, setTables] = useState<any>([]);
  const [template, setTemplate] = useState<any>(config.template);
  const isTablesEmpty = isEmpty(tables);

  const fetchTables = useCallback(async () => {
    const tablesResp = await getTables({ teamSlug });
    setTables(tablesResp);
  }, [teamSlug]);

  useEffect(() => {
    if (!isTablesEmpty) {
      fetchTables();
    }
  }, [fetchTables]);

  const handleOnSave = async () => {
    if (!isTablesEmpty) {
      // const taskResp = await createTask({
      //   teamSlug,
      //   formId,
      //   template,
      //   appSlug,
      //   taskSlug: get(config, "actions.0", ""),
      // });
      // console.log("taskResp: ", taskResp);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="text-lg">Airtable Integration</h2>
        {isTablesEmpty ? (
          <Button className="text-green-500 border border-green-500 rounded-none">
            Connect Airtable
          </Button>
        ) : (
          <Button className="text-red-500 border border-red-500 rounded-none">
            Disconnect Airtable
          </Button>
        )}
      </div>
      <div className="py-4">
        <h3>Getting Started</h3>
        <p className="my-2">
          To get you need to authorize Formzillion to access your Airtable
          account. Once authorized, you can select the table you want to insert
          the submissions.
        </p>
        <br />
        Click on &quot;Connect Airtable&quot; to connect your Airtable account.
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
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
}
