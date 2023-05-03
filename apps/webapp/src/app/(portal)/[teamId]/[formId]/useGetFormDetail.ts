import prisma from "@/lib/prisma";

export const useGetFormDetail = async (formId: any) => {
  if (!formId) {
    return [];
  }
  const formDetail = await prisma.forms.findFirst({
    where: {
      id: formId,
    },
  });
  return JSON.parse(JSON.stringify(formDetail));
};
