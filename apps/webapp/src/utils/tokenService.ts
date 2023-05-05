import prisma from "@/lib/prisma";

const generateToken = (length: number) => {
  const a: any =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  const b: any = [];
  for (let i: any = 0; i < length; i++) {
    const j: any = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
};

const getToken = async ({
  length,
  email,
}: {
  length: number;
  email: string;
}) => {
  const token = generateToken(length);
  await prisma.tokens.create({
    data: {
      token,
      email: email,
    },
  });
  return token;
};

const validateToken = async ({ token, toEmail }: any) => {
  let validToken: boolean = false;
  try {
    const getToken = await prisma.tokens.findUniqueOrThrow({
      where: {
        token,
      },
    });

    await prisma.tokens.update({
      where: {
        token,
      },
      data: {
        isActive: false,
        isUsed: true,
      },
    });

    if (getToken.email === toEmail) {
      validToken = true;
    }
    return validToken;
  } catch (err) {
    return validToken;
  }
};

export { getToken, validateToken };