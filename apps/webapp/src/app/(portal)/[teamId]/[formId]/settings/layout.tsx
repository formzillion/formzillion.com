import Sidebar from "./sidebar";

export default async function FormSettingsLayout({ children }: any) {
  return (
    <div className="flex mt-8 space-x-8">
      <Sidebar />
      {children}
    </div>
  );
}
