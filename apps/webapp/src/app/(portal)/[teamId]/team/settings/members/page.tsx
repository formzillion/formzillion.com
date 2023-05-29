import React from "react";
import Sidebar from "@/ui/Sidebar";
import AddMember from "./AddMember";
import prisma from "@/lib/prisma";
import MembersList from "./MembersList";
import { getUserDetail } from "@/utils/getUserDetail";

const MembersPage = async ({ params }: any) => {
  const { teamId: teamSlug } = params;
  const user = await getUserDetail();
  const currentUser = user.email;
  const teams = await prisma.memberships.findMany({
    where: { team: { slug: teamSlug } },
    include: { user: true, team: true },
  });
  const userEmail = JSON.stringify(currentUser);
  const serializedTeams = JSON.stringify(teams);

  return (
    <div className="w-full space-y-4">
      <AddMember teamSlug={teamSlug} teams={serializedTeams} />
      <MembersList teams={serializedTeams} currentUserEmail={userEmail} />
    </div>
  );
};

export default MembersPage;
