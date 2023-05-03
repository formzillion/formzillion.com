import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import getUserSession from "../userSession/getUserSession";
import { isEmpty } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { currentUser } = await getUserSession(req, res);
  console.log("currentUser: ", currentUser);
  try {
    if (!isEmpty(currentUser)) {
      const teams = await prisma.teams.findMany({
        where: {
          users: {
            some: {
              email: currentUser?.email,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          users: true,
        },
      });

      return res
        .status(201)
        .json({ success: true, data: teams, user: currentUser });
    }
  } catch (error) {
    console.log(error);
  }
}
