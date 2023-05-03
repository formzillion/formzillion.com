"use client";

import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Index({ TotalPages }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(TotalPages / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex justify-end dark:text-white">
      {currentPage > 1 ? (
        <IoIosArrowBack
          size={35}
          className="cursor-pointer rounded-lg border-2 p-1 shadow-sm dark:border-gray-700"
          onClick={handlePrevPage}
        />
      ) : (
        <div />
      )}
      <div className="mx-2 rounded-lg border-2 px-2 py-1 font-medium dark:border-gray-700">
        {currentPage} / {totalPages}
      </div>
      {currentPage < totalPages ? (
        <IoIosArrowForward
          size={35}
          className="cursor-pointer rounded-lg border-2 p-1 shadow-sm dark:border-gray-700"
          onClick={handleNextPage}
        />
      ) : (
        <div />
      )}
    </div>
  );
}
