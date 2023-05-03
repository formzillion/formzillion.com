import Sidebar from "./sidebar";

export default async function FormSettingsLayout({ children }: any) {
  return (
    <div className="flex mx-auto max-w-6xl mt-8 space-x-8">
      <Sidebar />
      {children}
    </div>
  );
}
