import React from 'react'

export default function Index({ setSearchTerm, setFilterType }: any) {

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
    const data = new XMLHttpRequest();
    data.open(
      "GET",
      `${process.env.WB_WEBHOOK_URL}/search?q=${event.target.value}`,
      true
    );
    data.onload = function () {
      if (data.status === 200) {
        const response = JSON.parse(data.responseText);
      } else {
        console.error(`Error ${data.status}: ${data.statusText}`);
      }
    };
    data.send();
  };

  const handleFilterTypeChange = (event: any) => {
    setFilterType(event.target.value);
  };
  return (
    <>
        <select
          onChange={handleFilterTypeChange}
          className="  border-gray-300 dark:bg-black dark:border-gray-700"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
        <div>
          <input
            className="w-[670px] border-gray-300 dark:bg-black dark:border-gray-700 "
            type="text"
            placeholder="Search here"
            onChange={handleInputChange}
          />
        </div>
    </>
  );
}
