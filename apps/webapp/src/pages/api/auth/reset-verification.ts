import sendgrid from "@sendgrid/mail";

const { SENDGRID_API_KEY }: any = process.env;
sendgrid.setApiKey(SENDGRID_API_KEY);

export default async function handler(req: any, res: any) {
  const body = req.body;

  const user = await prisma.users.findOne({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    throw new Error("You haven't registered yet");
  }

  res.status(200).json({ message: "success" });
}
