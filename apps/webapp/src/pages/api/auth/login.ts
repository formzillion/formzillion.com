import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/prisma";
import { get, snakeCase } from "lodash";
import { notifyOnSlack } from "@/utils/notifyOnSlack";

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
      const { teamSlug, avatar, planName, userDetail }: any = await getTeams(
        email
      );

      notifyOnSlack(
        "Login",
        `*User logged In*\n
            Email ID: ${email}\n`
      );
      
      return res
        .status(200)
        .json({ url: teamSlug, avatar, planName, userDetail });
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

  const allTeams = user?.teams;
  if (allTeams) {
    let teamDetail: any = allTeams?.filter(
      (team: any) => team.type === "personal"
    );

    let avatar: any = get(teamDetail, "0.avatar", "");
    let planName: any = get(teamDetail, "0.planName", "");
    let teamSlug = get(teamDetail, "0.slug", "dashboard");

    console.log("Team Slug", teamSlug);
    if (!teamSlug) {
      avatar = get(allTeams, "0.avatar", "");
      planName = get(allTeams, "0.planName", "");
      teamSlug = get(allTeams, "0.slug", "dashboard");
      console.log("Personal Slug", teamSlug);
    }

    return { teamSlug, avatar, planName: snakeCase(planName) };
  } else {
    return "dashboard";
  }
};

export { getTeams };
