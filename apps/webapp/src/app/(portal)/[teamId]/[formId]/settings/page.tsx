import React from "react";
import prisma from "@/lib/prisma";

import { PageProps } from "@/types/PageProps";
import SettingsForm from "./SettingsForm";
import { useGetFormDetail } from "../useGetFormDetail";

export default async function Page({ params }: PageProps) {
  const { formId } = params;
  const formDetail = await useGetFormDetail(formId);
  const formSubmissions = await prisma.form_submissions.findMany({
    where: {
      formId: formId,
    },
  });

  return (
    <>
      <SettingsForm formDetail={formDetail} formSubmissions={formSubmissions}/>
    </>
  );
}
