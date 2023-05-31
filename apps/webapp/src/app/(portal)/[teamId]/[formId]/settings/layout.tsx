import Sidebar from "./Sidebar";

export default async function FormSettingsLayout({ children }: any) {
  return (
    <div className="sm:flex mt-8 space-y-5 sm:space-y-0 sm:space-x-8 py-4">
      <Sidebar />
      {children}
    </div>
  );
}
