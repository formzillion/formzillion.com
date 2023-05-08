"use client";
import { format } from "date-fns";
import { isEmpty } from "lodash";

import Table from "@/ui/Table";
import Header from "@/ui/Header";
import Heading from "../../[teamId]/settings/Heading";

function InvoiceTable({ invoices, loading }: any) {
  return (
    <>
      {!isEmpty(invoices) ? (
        <Table
          thList={["Date", "Due", "Status", "Amount", "Receipt"]}
          loading={loading}
        >
          {invoices?.map((invoice: any) => {
            const dueDate = format(
              new Date(invoice.due_date * 1000),
              "dd-MMM-yyyy"
            );
            const createdDate = format(
              new Date(invoice.created * 1000),
              "dd-MMM-yyyy"
            );
            return (
              <tr key={invoice.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                  <time dateTime={invoice.datetime}>{createdDate}</time>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {invoice.due_date ? dueDate : "--"}
                </td>
                <td
                  className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                  role="cell"
                >
                  <div className="flex items-center">
                    {invoice.status === "open" && (
                      <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                    )}
                    {invoice.status === "paid" && (
                      <span className="h-2 w-2 rounded-full bg-green-400"></span>
                    )}
                    <span className="ml-2 capitalize dark:text-gray-300">
                      {invoice.status}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  US${invoice.total / 100}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <a
                    href={invoice.invoice_pdf}
                    target="_blank"
                    className="text-orange-600 hover:text-orange-900"
                    rel="noreferrer"
                  >
                    View receipt
                  </a>
                </td>
              </tr>
            );
          })}
        </Table>
      ) : (
        <div className="p-5 pt-0 dark:text-gray-500">
          You don&apos;t have any Billing History
        </div>
      )}
    </>
  );
}

export default function BillingHistory({ invoices, loading }: any) {
  return (
    <div className="space-y-5">
      <div className="bg-white shadow dark:bg-black border border-gray-300 dark:border-gray-700 ">
        <div className="p-4 px-6 divide-y divide-gray-300 dark:divide-gray-700">
          <Header title={"Billing history"} />
          <div className="pt-4">
            <Heading description="View your previos billing" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <InvoiceTable invoices={invoices} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
