import React from "react";

interface HeadingProps {
  title?: string;
  description?: string;
  plan?: any;
}
export default function Heading(props: HeadingProps) {
  const { title, description, plan } = props;

  return (
    <div>
      <b className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
        {title}
        {plan ? plan : ""}
      </b>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
}
