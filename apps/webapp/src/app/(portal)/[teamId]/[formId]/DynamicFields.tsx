"use client";

import { useState } from "react";
import { Input, Label } from "@/ui/fields";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

function App({ testData }: any) {
  const [dynamicValues, setDynamicValues] = useState<any[]>([
    { keyName: "Field", keyValue: "Value" },
  ]);
  testData(dynamicValues);

  const handleServiceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {

    const { name, value } = e.target;
    const updatedValues = [...dynamicValues];
    const fieldName = name.substring(0, name.length - 1);
    updatedValues[index][fieldName] = value;
    setDynamicValues(updatedValues);
  };

  const handleServiceRemove = (index: number) => {
    const list = [...dynamicValues];
    list.splice(index, 1);
    setDynamicValues(list);
  };

  const handleServiceAdd = () => {
    setDynamicValues([...dynamicValues, { keyName: "", keyValue: "" }]);
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
        {dynamicValues.map((item, index) => (
          <div key={index} className="mb-4 ml-24">
            <div className="grid grid-cols-5 space-x-4">
              <Input
                name={`keyName${index}`}
                type="text"
                value={item.keyName || ""}
                onChange={(e) => handleServiceChange(e, index)}
                required
                className="col-span-1 h-10"
              />

              <Input
                name={`keyValue${index}`}
                type="text"
                value={item.keyValue || ""}
                onChange={(e) => handleServiceChange(e, index)}
                required
                className="col-span-3 h-10 ml-4"
              />
              <div className="col-span-1 flex items-center justify-center">
                {dynamicValues.length - 1 === index &&
                dynamicValues.length < 50 ? (
                  <button
                    type="button"
                    onClick={handleServiceAdd}
                    className="add-btn"
                  >
                    <PlusCircleIcon className="h-8 w-6 text-green-700" />
                  </button>
                ) : (
                  <div className="second-division flex justify-content">
                    {dynamicValues.length !== 1 && (
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
