import { PrismaClient } from "database";

let prisma: PrismaClient;

declare global {
  var prisma: any;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

prisma.$use(async (params: any, next: any) => {
  // Manipulate params here
  const result = await next(params);
  // See results here
  return result;
});

export default prisma;
