"use client";
import { Button } from "@/ui/Buttons/SButton";
import { redirect } from "next/navigation";
import React from "react";

const NotFound = () => {
  return (
    <div className="text-center mt-8">
      <div>404 - Page Not Found</div>
      <Button variant="secondary" onClick={() => redirect("/login")}>
        Login
      </Button>
    </div>
  );
};

export default NotFound;
