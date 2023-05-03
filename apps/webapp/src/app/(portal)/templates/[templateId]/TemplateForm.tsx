"use client";
import { useForm } from "react-hook-form";
import { isEmpty, startCase } from "lodash";

import {
  EmailField,
  Form,
  InputField,
  SelectField,
  TextAreaField,
} from "@/ui/fields";
import Button from "@/ui/Buttons";

const TemplateForm = ({ data }: any) => {
  const formMethods = useForm<any>();

  const RenderField = ({ field }: any) => {
    switch (field.type) {
      case "text":
        return (
          <InputField
            label={
              isEmpty(field?.displayText)
                ? startCase(field.name)
                : field?.displayText
            }
            {...formMethods.register(field.name)}
            id={field.name}
            type={field.name}
            autoComplete={field.name}
          />
        );
      case "email":
        return (
          <EmailField
            label={
              isEmpty(field?.displayText)
                ? startCase(field.name)
                : field?.displayText
            }
            {...formMethods.register(field.name)}
            id={field.name}
            type={"email"}
            autoComplete={field.name}
          />
        );
      case "textField":
        return (
          <TextAreaField
            label={
              isEmpty(field?.displayText)
                ? startCase(field.name)
                : field?.displayText
            }
            {...formMethods.register(field.name)}
            id={field.name}
            autoComplete={field.name}
          />
        );
      case "select":
        const options: { value: string; label: string }[] = field.options.map(
          (option: any) => ({
            value: option,
            label: startCase(option),
          })
        );
        return (
          <>
            <SelectField
              label={
                isEmpty(field?.displayText)
                  ? startCase(field.name)
                  : field?.displayText
              }
              options={options}
              {...formMethods.register(field.name)}
            />
          </>
        );
      case "date":
        return (
          <InputField
            label={
              isEmpty(field?.displayText)
                ? startCase(field.name)
                : field?.displayText
            }
            type="date"
            {...formMethods.register(field.name)}
            id={field.name}
            autoComplete={field.name}
            className="block w-full rounded-sm border dark:bg-gray-900 dark:border-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm dark:text-gray-200"
          />
        );
      default:
        return <div></div>;
    }
  };

  return (
    <Form
      form={formMethods}
      handleSubmit={(d) => console.log(d)}
      className="space-y-6 border p-5 col-span-3 dark:border-gray-500"
    >
      {data?.formFields?.map((field: any) => (
        <div className="text-gray-500">
          <RenderField field={field} />
        </div>
      ))}
      <div className="flex space-x-4">
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
};

export default TemplateForm;
