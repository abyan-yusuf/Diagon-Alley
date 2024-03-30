import React, { useState } from "react";
import Logo from "/Logo.png";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../Api/authContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [homeActive, setHomeActive] = useState(false);
  const [productActive, setProductActive] = useState(false);
  const [auth, setAuth] = useAuthContext();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    toast.success("Successfully logged out");
  };
  return (
    <div className="navbar bg-base-100 border-b-2 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/products"}>Products</NavLink>
            </li>
          </ul>
        </div>
        <Link
          className="btn btn-ghost text-xl h-fit p-0 border-0 focus:transform-none active:hover:transform-none"
          to={"/"}
        >
          <img src={Logo} className="w-[280px]" />
        </Link>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  setHomeActive(isActive);
                  return [
                    isActive ? `bg-opacity-[0!important] text-black` : ``,
                    "font-bold focus:bg-[transparent!important] active:text-[black!important] hover:bg-transparent transition-all border-0 ease-in-out outline-none duration-500 group flex w-20 flex-wrap justify-center text-[16px]",
                  ].join(" ");
                }}
              >
                Home
                <div
                  className={`h-[3px] p-0 w-12 group-hover:animate-bounce group-hover:opacity-100 bg-black transition-opacity ease-in-out duration-1000 absolute top-8 ${
                    homeActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => {
                  setProductActive(isActive);
                  return [
                    isActive ? `bg-opacity-[0!important] text-black` : ``,
                    "font-bold focus:bg-[transparent!important] active:text-[black!important] hover:bg-transparent transition-all border-0 ease-in-out outline-none duration-500 group flex w-20 flex-wrap justify-center text-[16px]",
                  ].join(" ");
                }}
              >
                Products
                <div
                  className={`h-[3px] p-0 w-20 ease-in-out group-hover:animate-bounce group-hover:opacity-100 bg-black transition-opacity duration-1000 absolute top-8 ${
                    productActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {!auth.user ? (
        <div className="navbar-end space-x-5">
          <NavLink
            to={"/signin"}
            className="rounded-lg px-4 py-2 hover:bg-black hover:text-white font-semibold hover:border-black border-2 bg-transparent border-black min-h-[2rem] transition-all duration-500"
          >
            Signin
          </NavLink>
          <NavLink
            to={"/signup"}
            className="rounded-lg px-4 py-2 border-2 hover:bg-white hover:border-black hover:text-black transition-colors ease-in duration-500 font-semibold border-black bg-black text-white min-h-[2rem]"
          >
            Signup
          </NavLink>
        </div>
      ) : (
        <div className="navbar-end space-x-5">
          <NavLink
            className="rounded-lg px-4 py-2 border-2 hover:bg-white hover:border-black hover:text-black transition-colors ease-in duration-500 font-semibold border-black bg-black text-white min-h-[2rem]"
            to={"/signin"}
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
