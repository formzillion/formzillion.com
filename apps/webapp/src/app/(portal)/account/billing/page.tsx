import { getUserDetail } from "@/utils/getUserDetail";
import Billing from "./Billing";

export default async function Page() {
  const userDetails = await getUserDetail();
  return (
    <>
      <Billing userDetails={userDetails} />
    </>
  );
}
