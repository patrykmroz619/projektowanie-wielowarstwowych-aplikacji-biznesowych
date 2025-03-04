import React from "react";

import { SignOutButton } from "@/lib/auth";

const UserDashboardPage = () => {
  return (
    <>
      <div>User dashboard</div>
      <SignOutButton>Sign out</SignOutButton>
    </>
  );
};

export default UserDashboardPage;
