import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <ul className="menu w-1/4 h-full p-0 overflow-y-scroll no-scrollbar fixed border-r-2 pt-5">
      <h1 className="text-2xl text-center mb-3">User Menu</h1>
        <li className="border-b-2">
          <NavLink
            to={"/dashboard/user/profile"}
            className={({ isActive }) =>
              [
                isActive ? "bg-gray-200" : "",
                "rounded-none transition-all active:text-[black!important] active:bg-[#e5e7eb!important] hover:outline-0",
              ].join(" ")
            }
          >
            My Profile
          </NavLink>
        </li>
        <li className="border-b-2">
          <NavLink
            to={"/dashboard/user/orders"}
            className={({ isActive }) =>
              [
                isActive ? "bg-gray-200" : "",
                "rounded-none transition-all active:text-[black!important] active:bg-[#e5e7eb!important] hover:outline-0",
              ].join(" ")
            }
          >
            My Orders{" "}
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default UserMenu;
