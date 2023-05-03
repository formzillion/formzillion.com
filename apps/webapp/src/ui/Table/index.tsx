import LoaderTable, { LoaderTableHeader } from "@/ui/Loader/LoaderTable";

const thClassNames =
  "pl-8 pt-4 pb-4 text-gray-600 bg-gray-100 h-[44px] tracking-wide leading-tight border-b border-gray-200 text-left text-xs font-bold uppercase";

export default function Table({ loading = false, thList = [], children }: any) {
  return (
    <>
      <div className="overflow-hidden border-t border-gray-200 dark:border-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-black">
            <tr>
              {!loading ? (
                thList.map((thItem: any) => (
                  <th
                    key={thItem}
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400"
                  >
                    {thItem}
                  </th>
                ))
              ) : (
                <LoaderTableHeader
                  thList={thList}
                  thClassNames={thClassNames}
                />
              )}
            </tr>
          </thead>
          <tbody className="rounded-lg bg-white dark:bg-black">
            {loading ? <LoaderTable td={thList.length} /> : children}
          </tbody>
        </table>
      </div>
    </>
  );
}
