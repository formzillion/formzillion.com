import { getUserDetail } from "@/utils/getUserDetail";
import { UserDetailsForm } from "./UserDetailsForm";

export default async function AccountPage() {
  const userDetails = await getUserDetail();

  return (
    <>
      <UserDetailsForm userDetails={userDetails} />
    </>
  );
}
