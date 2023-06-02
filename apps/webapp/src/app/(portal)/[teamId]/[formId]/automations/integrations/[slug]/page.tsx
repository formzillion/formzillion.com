import { PageProps } from "@/types/PageProps";

export default function ({ params }: PageProps) {
  console.log("params: ", params);
  return (
    <div>
      <h1>{params.slug} Integration</h1>
    </div>
  );
}
