import { redirect } from "next/navigation";

//Note: By default always redirect to login page
export default function page() {
  redirect("/login");
}
