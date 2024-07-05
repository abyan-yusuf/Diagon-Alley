import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <ul className="menu w-1/4 h-full p-0 overflow-y-scroll no-scrollbar fixed border-r-2">
        <h2 className="text-3xl text-center mb-10">Admin Menu</h2>
        <li className="border-b-2">
          <NavLink
            to={"/dashboard/admin/manage-category"}
            className={({ isActive }) =>
              [
                isActive ? "bg-gray-200" : "",
                "rounded-none transition-all active:text-[black!important] active:bg-[#e5e7eb!important] hover:outline-0",
              ].join(" ")
            }
          >
            Categories
          </NavLink>
        </li>
        <li className="border-b-2">
          <NavLink
            to={"/dashboard/admin/manage-product"}
            className={({ isActive }) =>
              [
                isActive ? "bg-gray-200" : "",
                "rounded-none transition-all active:text-[black!important] active:bg-[#e5e7eb!important] hover:outline-0",
              ].join(" ")
            }
          >
            Products
          </NavLink>
        </li>
        <li className="border-b-2">
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
