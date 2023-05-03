import { createServerClient } from "@/utils/supabase-server";
import prisma from "@/lib/prisma";

export const getUserData = async ({
  include = { teams: true },
  select,
}: {
  include?: object;
  select?: object;
  where?: object;
}) => {
  const supabase = createServerClient();
  const { data } = await supabase.auth.getSession();
  const email = data?.session?.user?.email;

  if (!email) {
    return {};
  }

  const options: any = select ? { select } : { include };

  const user: any = await prisma.users.findUnique({
    where: { email },
    ...options,
  });
  return user;
};

export default getUserData;
