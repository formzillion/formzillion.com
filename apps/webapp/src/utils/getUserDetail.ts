import { createServerClient } from "@/utils/supabase-server";
import prisma from "@/lib/prisma";

export const getUserDetail = async () => {
  // Create authenticated Supabase Client
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const email = session?.user?.email;
  if (!email) {
    return {};
  }
  const user: any = await prisma.users.findUnique({
    where: { email },
    include: {
      teams: true,
      memberships: true,
    },
  });
  return user || {};
};
