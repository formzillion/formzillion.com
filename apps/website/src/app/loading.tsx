import Loader from "@/ui/Loader";
import React from "react";

export default function loading() {
  return (
    <div className="m-auto flex justify-center items-center">
      <Loader />
    </div>
  );
}
