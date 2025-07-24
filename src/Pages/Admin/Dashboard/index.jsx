import React from "react";
import { Outlet } from "react-router";
import AdminSidebar from "../../../Components/AdminSidebar";
const index = () => {
  return (
    <div className="w-full flex items-start justify-start md:gap-4 gap-2 h-screen">
      <AdminSidebar />

      <div className="w-full ml-24 flex flex-1 items-start justify-start py-4 px-2">
        <Outlet />
      </div>
    </div>
  );
};

export default index;
