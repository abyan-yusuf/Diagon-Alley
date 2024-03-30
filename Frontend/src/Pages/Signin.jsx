import React from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import Logo from "/Title_Logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../Api/authContext";
const Signin = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuthContext();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "https://diagon-alley-p4xm.onrender.com/api/v1/users/login",
        data
      );
      console.log(response);
      setAuth({
        ...auth,
        user: response?.data?.allInfo,
        token: response?.data?.token,
      });
      localStorage.setItem("auth", JSON.stringify(response?.data));
      if (response?.data?.message === "Logged in successfully") {
        navigate(location.state || "/");
      }
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.message === "Incorrect Password") {
        toast.error("Incorrect Password!");
      }
      if (error?.response?.data?.message === "User does not exists") {
        toast.error(
          <div>
            User does not exists!{" "}
            <Link
              to={"/signup"}
              className="underline underline-offset-4 hover:no-underline"
            >
              Signup
            </Link>
          </div>
        );
      }
    }
  };
  return (
    <Layout
      titleText="Signin | Diagon Alley"
      author={"Abyan"}
      desc={"This is the sign in page! Sign in or Sign up"}
      keywords={"Sign In, Diagon Alley, Diagon Alley Signin"}
    >
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <img src={Logo} width={"100px"} />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create account
            </Link>
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    required
                    {...register("email")}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    required
                    {...register("password")}
                  />
                  <a className="text-sm font-medium" href="/forgot-password">
                    Forgot Password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
