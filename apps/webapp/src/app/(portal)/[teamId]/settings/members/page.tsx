import React from "react";
import Sidebar from "@/ui/Sidebar";
import AddMember from "./AddMember";
import prisma from "@/lib/prisma";
import MembersList from "./MembersList";
import { getUserDetail } from "@/utils/getUserDetail";

const MembersPage = async ({ params }: any) => {
  const { teamId: teamSlug } = params;
  const user = await getUserDetail();
  const currentuser = user.email;
  const teams = await prisma.memberships.findMany({
    where: { team: { slug: teamSlug } },
    include: { user: true, team: true },
  });
  const userEmail = JSON.stringify(currentuser);
  const serializedTeams = JSON.stringify(teams);
  return (
    <div className="w-full mt-6">
      <AddMember teamSlug={teamSlug} />
      <MembersList teams={serializedTeams} currentUserEmail={userEmail} />
    </div>
  );
};

export default MembersPage;
