import React, { useState } from "react";
import Logo from "/Logo.png";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../Api/authContext";
import toast from "react-hot-toast";
import axios from "axios"
import ChevronRight from "/chevron-right.svg";

const Navbar = () => {
  const [homeActive, setHomeActive] = useState(false);
  const [productActive, setProductActive] = useState(false);
  const [auth, setAuth] = useAuthContext();
  const [open, setOpen] = useState(true);
  const handleHover = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    toast.success("Successfully logged out");
  };
  const handleDelete =  async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3582/api/v1/users/delete/${auth?.user?._id}`,
        {
          headers: {
            Authorization: auth?.token
          }
        }
      );
      localStorage.removeItem("auth");
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      toast.success("Successfully deleted account");
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="navbar bg-base-100 border-b-2 shadow-lg z-50">
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
          className="btn btn-ghost text-xl h-fit p-0 border-0 focus:transform-none animate-none focus-visible:outline-none active:hover:transform-none transition-none duration-0"
          to={"/"}
          onClick={(event) => event.preventDefault()}
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
          <div
            className="dropdown dropdown-hover"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
          >
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 bg-transparent border-none shadow-none hover:bg-transparent text-base font-semibold"
            >
              <img
                src={ChevronRight}
                width={20}
                className={
                  open
                    ? "rotate-0 transition-transform"
                    : "rotate-90 transition-transform"
                }
              />
              {auth?.user?.name}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box "
            >
              <li>
                <NavLink
                  to={`/dashboard/${auth?.user?.admin ? `admin` : `user`}`}
                  className={"font-medium"}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/signin"}
                  onClick={handleLogout}
                  className="text-red-700 font-medium"
                >
                  Logout
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/signin"}
                  onClick={handleDelete}
                  className="text-red-700 font-medium"
                >
                  Delete Account
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
