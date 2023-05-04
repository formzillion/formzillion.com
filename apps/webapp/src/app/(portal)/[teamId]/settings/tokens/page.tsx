import React from "react";
import CreateToken from "./CreateToken";
import TokensList from "./TokensList";

const MembersPage = async () => {
  return (
    <div className="w-full space-y-4">
      <CreateToken />
      <TokensList />
    </div>
  );
};

export default MembersPage;
