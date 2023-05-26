import Sidebar from "@/ui/Sidebar";

export default async function TeamSettingsLayout({ children, params }: any) {
  return (
    <div className="flex mt-8 space-x-8 py-4">
      <Sidebar />
      {children}
    </div>
  );
}
