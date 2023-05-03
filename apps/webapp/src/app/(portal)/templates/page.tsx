"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/ui/fields";
import SearchSection from "./SearchSection";
import FormTemplateItem from "./FormTemplateItem";
import { categories, templates } from "./data";

function FormTemplateList({ selectedCategories, searchValue }: any) {
  const filteredData = templates.filter((item) => {
    if (selectedCategories.length === 0) {
      return true;
    }
    return selectedCategories.includes(item.category);
  });

  return (
    <div>
      <h4 className="py-4 text-lg text-gray-600 font-normal">Templates</h4>
      <div className="border divide-y-2 rounded-t-lg rounded-l-lg">
        {filteredData.map(
          (template, idx) =>
            template.name.toLowerCase().includes(searchValue.toLowerCase()) && (
              <FormTemplateItem template={template} key={idx} />
            )
        )}
      </div>
    </div>
  );
}

export default function Page() {
  const formMethods = useForm<any>();
  const [selectedCategories, setSelectedCategories] = useState<any>([]);

  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: any) => {
    const { value } = e.target;
    if (selectedCategories.includes(value)) {
      setSelectedCategories(
        selectedCategories.filter((category: any) => category !== value)
      );
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-3xl font-normal leading-relaxed text-gray-500 py-4">
        Form Templates
      </h1>
      <div className="flex flex-row">
        <div>
          <h4 className="p-4 text-gray-600">Categories</h4>
          <div className="space-y-4">
            {categories.map((category, idx) => {
              return (
                <div className="relative flex items-start" key={idx}>
                  <div className="flex h-5 items-center mr-1">
                    <Input
                      {...formMethods.register(category.value, {
                        onChange: (e: any) => {
                          handleChange(e);
                        },
                      })}
                      type="checkbox"
                      id={category.value}
                      value={category.value}
                      className={
                        "text-orange-600 focus:checked:bg-orange-700 focus:ring-orange-500 h-4 w-4 rounded border-gray-300 mr-2 checked:bg-orange-700 hover:bg-gray-100"
                      }
                    />
                  </div>
                  <label
                    htmlFor={category.value}
                    className="text-md dark:text-gray-500"
                  >
                    {category.label}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full flex-1 ml-20">
          <SearchSection setSearchValue={setSearchValue} />
          <FormTemplateList
            selectedCategories={selectedCategories}
            searchValue={searchValue}
          />
        </div>
      </div>
    </div>
  );
}
