"use client";
import { useCallback, useEffect, useState } from "react";
import { isEmpty, startCase } from "lodash";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/ui/Select";
import { Button } from "@/ui/Buttons/SButton";
import getTables from "@/app/fetch/integrations/airtable/getTables";

// TODO: Remove this after confirming the data is correct
const mockData = {
  tables: [
    {
      label: "Table Name",
      value: "tableIdxxx",
      baseId: "baseIdxxx",
    },
  ],
  tableId: "tableIdxxx",
};

export default function ({ teamSlug, formId }: { teamSlug: string, formId: string }) {
  console.log("teamSlug: ", teamSlug);
  const [tables, setTables] = useState<any>(mockData.tables);
  const [template, setTemplate] = useState(mockData);
  const isTablesEmpty = isEmpty(tables);

  const fetchTables = useCallback(async () => {
    const tablesResp = await getTables({ teamSlug });
    setTables(tablesResp);
  }, []);

  // useEffect(() => {
  //   fetchTables();
  // }, [fetchTables]);

  const handleOnSave = async () => {};

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
        Click on "Connect Airtable" to connect your Airtable account.
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
          <Button className="float-right mt-4 bg-orange-600 text-white rounded-none">
            Save
          </Button>
        </div>
      )}
    </div>
  );
}
