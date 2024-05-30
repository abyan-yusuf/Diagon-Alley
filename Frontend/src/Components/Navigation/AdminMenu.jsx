import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <h1 className="text-2xl text-center mb-3">Admin Menu</h1>
      <ul className="menu w-full p-0">
        <li className="border-2 border-b-0">
          <NavLink
            to={"/dashboard/admin/create-category"}
            className={({ isActive }) =>
              [
                isActive ? "bg-gray-200" : "",
                "rounded-none transition-all active:text-[black!important] active:bg-[#e5e7eb!important] hover:outline-0",
              ].join(" ")
            }
          >
            Create Category
          </NavLink>
        </li>
        <li className="border-2 border-b-0">
          <NavLink
            to={"/dashboard/admin/create-product"}
            className={({ isActive }) =>
              [
                isActive ? "bg-gray-200" : "",
                "rounded-none transition-all active:text-[black!important] active:bg-[#e5e7eb!important] hover:outline-0",
              ].join(" ")
            }
          >
            Create Product
          </NavLink>
        </li>
        <li className="border-2">
          <NavLink
            to={"/dashboard/admin/all-users"}
            className={({ isActive }) =>
              [
                isActive ? "bg-gray-200" : "",
                "rounded-none transition-all active:text-[black!important] active:bg-[#e5e7eb!important] hover:outline-0",
              ].join(" ")
            }
          >
            Users
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default AdminMenu;
