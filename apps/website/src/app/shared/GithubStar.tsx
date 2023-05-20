"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/ui/Loader";
import { FiGithub } from "react-icons/fi";

export default function GithubStar() {
  const [starCount, setStarCount] = useState(null);
  const url = "https://api.github.com/repos/formzillion/formzillion.com";

  useEffect(() => {
    async function fetchStarCount() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const count = data.stargazers_count;
        setStarCount(count);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStarCount();
  }, []);

  return (
    <div className="flex items-center border border-gray-700">
      <a
        href="https://github.com/formzillion/formzillion.com"
        target="_blank"
        rel="noreferrer"
      >
        <p className="text-white p-1 px-2 rounded-l flex gap-1 items-center bg-gray-950 hover:bg-gray-800">
          <FiGithub className="h-5 w-5 inline" />
          Star us
        </p>
      </a>
      <a
        href="https://github.com/formzillion/formzillion.com/stargazers"
        target="_blank"
        rel="noreferrer"
        className="flex items-center"
      >
        <p className="text-center hover:text-orange-400 p-1 px-2 rounded-r text-white border-l border-gray-800">
          {starCount === null ? <Loader className="w-[15px]" /> : starCount}
        </p>
      </a>
    </div>
  );
}
