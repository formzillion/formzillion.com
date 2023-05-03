import Sidebar from "@/ui/Sidebar";

export default async function TeamSettingsLayout({ children, params }: any) {
  return (
    <div className="flex mx-auto max-w-6xl mt-8 space-x-8 p-4">
      <Sidebar />
      {children}
    </div>
  );
}
