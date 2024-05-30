import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <h1 className="text-2xl text-center mb-3">User Menu</h1>
      <ul className="menu w-full p-0">
        <li className="border-2 border-b-0">
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
        <li className="border-2">
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
