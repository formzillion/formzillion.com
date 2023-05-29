import { PageProps } from "@/types/PageProps";
import prisma from "@/lib/prisma";
import ClientWrapper from "./ClientWrapper";
import FormSubmissions from "@/app/(portal)/[teamId]/[formId]/FormSubmissions";
import { getUserDetail } from "@/utils/getUserDetail";

export default async function Page({ params }: PageProps) {
  const formId = params.formId;
  const user: any = await getUserDetail();
  const formSubmissions = await prisma.form_submissions.findMany({
    where: {
      formId: formId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const serializedFormSubmissions = JSON.stringify(formSubmissions);
  const serializedUser = JSON.stringify(user);
  const TotalPages = formSubmissions.length;

  return (
    <>
      <ClientWrapper>
        <FormSubmissions
          formId={formId}
          formSubmissions={serializedFormSubmissions}
          TotalPages={TotalPages}
          userData={serializedUser}
        />
      </ClientWrapper>
    </>
  );
}
