import { PageProps } from "@/types/PageProps";
import prisma from "@/lib/prisma";
import ClientWrapper from "./ClientWrapper";
import FormSubmissions from "@/app/(portal)/[teamId]/[formId]/FormSubmissions";

export default async function Page({ params }: PageProps) {
  const formId = params.formId;
  const formSubmissions = await prisma.form_submissions.findMany({
    where: {
      formId: formId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const serializedFormSubmissions = JSON.stringify(formSubmissions);
  const TotalPages = formSubmissions.length;

  return (
    <>
      <ClientWrapper>
        <FormSubmissions
          formId={formId}
          formSubmissions={serializedFormSubmissions}
          TotalPages={TotalPages}
        />
      </ClientWrapper>
    </>
  );
}
