import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/prisma";

export default async function getUserSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const email = session?.user?.email;
  const currentUser: any = await prisma.users.findFirst({
    where: { email },
  });
  return { supabase, session, email, currentUser };
}
