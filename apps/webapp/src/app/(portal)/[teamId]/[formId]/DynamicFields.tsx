"use client";

import { useState } from "react";
import { Input, Label } from "@/ui/fields";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

interface Service {
  service: string;
}

function App() {
  const [serviceList, setServiceList] = useState<Service[]>([{ service: "" }]);

  const handleServiceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index] = { ...list[index], [name]: value };
    setServiceList(list);
  };

  const handleServiceRemove = (index: number) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

  return (
    <form className="App" autoComplete="off">
      <div className="form-field">
        <label htmlFor="service" className="text-black">
          Add Fields
        </label>
        {serviceList.map((singleService, index) => (
          <div key={index} className="mb-4">
            <div className="grid grid-cols-5 space-x-4">
              <Input
                name="service"
                type="text"
                id="service"
                value={`Field${index + 1}`}
                onChange={(e) => handleServiceChange(e, index)}
                required
                className="col-span-1 h-10"
              />

              <Input
                name="service"
                type="text"
                id="service"
                value={singleService.service}
                onChange={(e) => handleServiceChange(e, index)}
                required
                className="col-span-3 h-10"
              />
              <div className="col-span-1 flex items-center justify-end">
                {serviceList.length - 1 === index && serviceList.length < 50 && (
                  <button
                    type="button"
                    onClick={handleServiceAdd}
                    className="add-btn"
                  >
                    <PlusCircleIcon className=" h-8 w-6 text-green-700" />
                  </button>
                )}
                 {serviceList.length - 2 === index &&(
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
