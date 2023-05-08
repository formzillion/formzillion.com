import prisma from "@/lib/prisma";
import { PageProps } from "@/types/PageProps";
import SearchForm from "./SearchForm";

export default async function page({ params }: PageProps) {
  const teamSlug = params.teamId;
  let forms: any = [];
  try {
    const allForms = await prisma.forms.findMany({
      where: { team: { slug: teamSlug } },
      orderBy: {
        createdAt: "desc",
      },
    });

    forms = JSON.parse(JSON.stringify(allForms));
  } catch (error) {}

  const formCounts: Record<number, number> = {};

  for (const form of forms) {
    const count = await prisma.form_submissions.count({
      where: {
        formId: form.id,
      },
    });
    formCounts[form.id] = count;
  }

  return (
    <div className="dark:bg-black min-h-screen">
      <div className="mx-auto sm:max-w-7xl">
        <SearchForm forms={forms} teamSlug={teamSlug} formCounts={formCounts} />
      </div>
    </div>
  );
}
