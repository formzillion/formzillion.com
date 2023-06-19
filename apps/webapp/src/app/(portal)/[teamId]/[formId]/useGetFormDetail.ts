import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const useGetFormDetail = async (formId: any) => {
  if (!formId) {
    return [];
  }

  const formDetail = await prisma.forms.findFirst({
    where: {
      id: formId,
    },
    include: {
      team: true,
    },
  });

  if (!formDetail) {
    notFound();
  }

  return JSON.parse(JSON.stringify(formDetail));
};
