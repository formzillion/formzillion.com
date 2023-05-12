"use client";

import { useState } from "react";
import { Input, Label } from "@/ui/fields";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { isEmpty } from "lodash";

function App({ testData }: any) {
  const [serviceList, setServiceList] = useState([{ fields: "" }]);
  const [title, setTitle] = useState("");

  const fieldsString = serviceList
    .map((service, index) => {
      return `${service.fields}`;
    })
    .join(", ");

  testData(fieldsString);

  const handleServiceChange: any = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index] = { ...list[index], [name]: value };
    setServiceList(list);
  };

  const handleService: any = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    setTitle(value);
  };

  const handleServiceRemove = (index: number) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { fields: "" }]);
  };



  return (
    <form className="App" autoComplete="off">
      <div className="form-field">
        <label
          htmlFor="fields"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Add Fields
        </label>
        {serviceList.map((singleService, index) => (
          <div key={index} className="mb-4 ml-24">
            <div className="grid grid-cols-5 space-x-4">
              <Input
                name="fields"
                type="text"
                id="fields"
                value={isEmpty(title) ? `Field${index + 1}` : title}
                onChange={(e) => handleService(e, index)}
                required
                className="col-span-1 h-10"
              />

              <Input
                name="fields"
                type="text"
                id="fields"
                value={singleService.fields}
                onChange={(e) => handleServiceChange(e, index)}
                required
                className="col-span-3 h-10 ml-4"
              />
              <div className="col-span-1 flex items-center justify-end">
                {serviceList.length - 1 === index &&
                  serviceList.length < 50 && (
                    <button
                      type="button"
                      onClick={handleServiceAdd}
                      className="add-btn"
                    >
                      <PlusCircleIcon className=" h-8 w-6 text-green-700" />
                    </button>
                  )}
                {serviceList.length - 2 === index && (
                  <div className="second-division flex justify-content">
                    {serviceList.length !== 1 && (
                      <button
                        type="button"
                        onClick={() => handleServiceRemove(index)}
                        className="remove-btn"
                      >
                        <MinusCircleIcon className="h-5 w-6 text-red-800" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}

export default App;
