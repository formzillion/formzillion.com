"use client";
import React, { useEffect, useState } from "react";

export default function Index({
  setSearchTerm,
  setFilterType,
  searchTerm,
  filterType,
  formId,
}: any) {
  const [results, setResults] = useState([]);
  useEffect(() => {
    async function fetchResults() {
      if (searchTerm.length > 0) {
        const res = await fetch(`/api/form-submission/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            { filterFields: { [filterType]: searchTerm },formId},
          ),
        });
        const data = await res.json();
        setResults(data);
      } else {
        setResults([]);
      }
    }
    fetchResults();
  }, [filterType, formId, searchTerm]);

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
          className="w-[740px] border-gray-300 dark:bg-black dark:border-gray-700 "
          type="text"
          placeholder="Search here"
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}
