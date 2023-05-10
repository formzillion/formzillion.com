import React from "react";

export default function Index({ setSearchTerm, setFilterType }: any) {
  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);

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
          className="w-[630px] border-gray-300 dark:bg-black dark:border-gray-700 "
          type="text"
          placeholder="Search here"
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}
