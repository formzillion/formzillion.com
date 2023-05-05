import { isEmpty } from "lodash";
import prisma from "@/lib/prisma";
import Search from "@/components/Search";
import { PageProps } from "@/types/PageProps";
import ActionsSection from "./ActionsSection";
import FormListItem from "./FormListItem";
import EmptyForm from "./EmptyForm";

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

  return (
    <div className="dark:bg-neutral-900 min-h-screen">
      <div className="mx-auto sm:max-w-7xl">
        <div className="grid grid-cols-5 space-x-4 items-center mb-10 pt-7 px-2 sm:px-0 mr-[10px] md:mx-4 md:mr-[26px]">
          <div className="col-span-4">
            <Search />
          </div>
          <ActionsSection teamSlug={teamSlug} />
        </div>

        {!isEmpty(forms) ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:mx-4">
            {forms.map((form: any, idx: any) => {
              return <FormListItem form={form} key={idx} teamSlug={teamSlug} />;
            })}
          </div>
        ) : (
          <EmptyForm teamSlug={teamSlug} />
        )}
      </div>
    </div>
  );
}
