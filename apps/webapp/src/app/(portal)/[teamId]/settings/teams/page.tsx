import TeamsList from "./TeamsList";
import { getUserDetail } from "@/utils/getUserDetail";

const page = async () => {
  const user: any = await getUserDetail();
  const serializedTeams = JSON.stringify(user);
  return (
    <div className="w-full space-y-4">
      <TeamsList teams={serializedTeams} />
    </div>
  );
};

export default page;
