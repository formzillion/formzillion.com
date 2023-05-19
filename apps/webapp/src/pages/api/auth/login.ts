import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/prisma";
import { get } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  }: any = await supabase.auth.getSession();
  const loginEmail: any = session?.user?.email;
  const { email, password, type } = req.body;

  //Using this if the user already has a session
  if (type === "hasSession") {
    const { teamSlug, avatar, planName }: any = await getTeams(loginEmail);
    return res.status(200).json({ url: teamSlug, avatar, planName });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return res.status(500).json({ error: error });
  }
  try {
    if (data) {
      const { teamSlug, avatar, planName }: any = await getTeams(email);
      return res.status(200).json({ url: teamSlug, avatar, planName });
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

const getTeams = async (email: string) => {
  const user: any = await prisma.users.findUnique({
    where: { email },
    include: { teams: true },
  });

  const teams = user?.teams;
  if (teams) {
    let teamSlug: any = teams?.filter((team: any) => team.type === "personal");

    let avatar: any = get(teamSlug, "0.avatar", "");
    let planName: any = get(teamSlug, "0.planName", "");
    teamSlug = get(teamSlug, "0.slug", "dashboard");

    if (!teamSlug) {
      teamSlug = get(teams, "0.slug", "dashboard");
      avatar = get(teams, "0.avatar", "");
      planName = get(teams, "0.planName", "");
    }

    return { teamSlug, avatar, planName };
  } else {
    return "dashboard";
  }
};

export { getTeams };
