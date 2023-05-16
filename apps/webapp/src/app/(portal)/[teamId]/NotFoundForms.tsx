import React from "react";
import Image from "next/image";

interface NotFoundFormsProps {
  title: string;
  description: string;
}

export default function NotFoundForms(props: NotFoundFormsProps) {
  const { title, description } = props;

  return (
    <div className="w-full">
      <div className="flex mt-10 justify-center">
        <Image
          src={"/empty_submissions.svg"}
          alt="Empty Form logo"
          width={250}
          height={250}
        />
      </div>

      <h1 className="text-center mt-4 font-light text-2xl">{title}</h1>
      <p
        className="text-center mt-4"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
