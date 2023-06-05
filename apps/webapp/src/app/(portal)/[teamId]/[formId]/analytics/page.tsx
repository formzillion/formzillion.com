import { PageProps } from "@/types/PageProps";
import FormSummary from "./FormSummary";

export default function Page({ params }: PageProps) {
  const { formId } = params;

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <FormSummary
          formId={formId}
          type="daily"
          title="Daily Summary"
          subtitle="Form Submissions by Day"
        />
        <FormSummary
          formId={formId}
          type="weekly"
          title="Weekly Summary"
          subtitle="Form Submissions by Week"
        />
        <FormSummary
          formId={formId}
          type="monthly"
          title="Monthly Summary"
          subtitle="Form Submissions by Month"
        />
        <FormSummary
          formId={formId}
          type="yearly"
          title="Summary by Country"
          subtitle="Form Submissions by Country"
          groupBy="country"
        />
      </div>
    </>
  );
}
