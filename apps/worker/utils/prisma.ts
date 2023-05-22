import { PrismaClient } from "database";

const prisma: PrismaClient = new PrismaClient();

prisma.$use(async (params: any, next: any) => {
  // Manipulate params here
  const result = await next(params);
  // See results here
  return result;
});

export default prisma;
