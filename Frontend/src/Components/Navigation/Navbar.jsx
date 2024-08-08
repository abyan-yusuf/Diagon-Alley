import React, { useState } from "react";
import Logo from "/Logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Api/authContext";
import toast from "react-hot-toast";
import axios from "axios";
import ChevronRight from "/chevron-right.svg";
import { useSearchContext } from "../../Api/searchContext";
import useCategories from "../../hooks/useCategories";
import { useCartContext } from "../../Api/cartContext";

const Navbar = () => {
  const [homeActive, setHomeActive] = useState(false);
  const [auth, setAuth] = useAuthContext();
  const [values, setValues] = useSearchContext();
  const [cartData] = useCartContext()
  const [open, setOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const navigate = useNavigate();
  const categories = useCategories();

  const handleHover = () => {
    setOpen(!open);
  };

  const handleCategoryHover = () => {
    setCategoryOpen(!categoryOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:3582/api/v1/products/search/${values.keywords}`
      );
      console.log(data);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.error(error);
      toast.error("Error while searching");
    }
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

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3582/api/v1/users/delete/${auth?.user?._id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      localStorage.removeItem("auth");
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      toast.success("Successfully deleted account");
      console.log(response);
    } catch (error) {
      console.log(error);
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
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          <img src={Logo} className="w-[280px]" />
        </Link>
      </div>
      <div className="navbar-center">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li className="flex items-center flex-row h-full w-auto ml-[0!important] mr-[0!important]">
              <div className="p-0">
                <div
                  className="dropdown dropdown-hover visited:bg-[transparent!important]"
                  onMouseEnter={handleCategoryHover}
                  onMouseLeave={handleCategoryHover}
                >
                  <div className="btn mt-1 h-min min-h-0 p-0.5 px-1 bg-transparent border-none shadow-none hover:bg-[transparent!important] text-base font-bold">
                    <img
                      src={ChevronRight}
                      width={20}
                      className={
                        categoryOpen
                          ? "rotate-0 transition-transform duration-500"
                          : "rotate-90 transition-transform duration-500"
                      }
                    />
                    Categories
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36"
                  >
                    {categories.map((c) => (
                      <li key={c._id}>
                        <NavLink to={`/category/${c._id}`} className="">
                          {c.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <form className="form-control flex-row mx-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            className="input w-[35rem!important] h-12 input-bordered md:w-auto mr-2"
            required
            value={values.keywords}
            onChange={(e) => {
              setValues({ ...values, keywords: e.target.value });
            }}
          />
          <button
            type="submit"
            className="rounded-lg px-4 py-2 border-2 h-12 hover:bg-white hover:border-black hover:text-black transition-colors ease-in duration-500 font-semibold border-black bg-black text-white min-h-[2rem]"
          >
            Search
          </button>
        </form>
      </div>
      <div className="navbar-end space-x-5">
        <div className="hidden lg:flex mr-5"></div>
        <NavLink className="m-[0!important]" to={"/cart"}>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cartData.length}
              </span>
            </div>
          </div>
        </NavLink>
        {!auth.user ? (
          <>
            {" "}
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
          </>
        ) : (
          <>
            <div
              className="dropdown dropdown-hover m-[0!important]"
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
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
