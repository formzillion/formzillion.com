import Sidebar from "@/ui/Sidebar";

export default async function TeamSettingsLayout({ children, params }: any) {
  return (
    <div className="divide-y divide-gray-700 dark:bg-black">
      <div>
        <div className="flex mx-auto max-w-7xl ">
          <Sidebar />
          {children}
        </div>
      </div>
    </div>
  );
}
