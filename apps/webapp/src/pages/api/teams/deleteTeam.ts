import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { teamSlug } = req.body;
  try {
    const teamToDelete = await prisma.teams.findUnique({
      where: { slug: teamSlug },
    });

    if (teamToDelete) {
      // Delete the team
      await prisma.teams.delete({
        where: { id: teamToDelete.id },
      });

      console.log(`Team with slug '${teamSlug}' has been deleted.`);
    } else {
      console.log(`No team found with slug '${teamSlug}'.`);
    }
    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
  }
}
