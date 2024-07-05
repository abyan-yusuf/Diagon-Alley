import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Logo from "/Title_Logo.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../Api/authContext";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuthContext();
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = { email, securityAnswer, newPassword };
      console.log(data);
      const resetPassword = await axios.post(
        "http://localhost:3582/api/v1/users/forgot-password",
        data
      );
      if (
        resetPassword?.data?.message ===
        "Password has been updated successfully"
      ) {
        toast.success("Your password has been updated successfully");
      }
      console.log(resetPassword);
      navigate("/signin");
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.message === "Wrong Email or Answer") {
        toast.error("Wrong Secret Answer!");
      }
    }
  };
  const getQuestion = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3582/api/v1/users/get-sec-ques",
        { email }
      );
      console.log(response);
      setSecurityQuestion(response?.data);
      console.log(securityQuestion);
    } catch (error) {
      if (error?.response?.data?.message === "No user found with this email") {
        toast.error("No user with this email");
      }
    }
  };
  return (
    <Layout
      titleText="Reset Password | Diagon Alley"
      author={"Abyan"}
      desc={
        "This is the password reseting page! If you forgot your password you can reset it!"
      }
      keywords={
        "Reset Password, Forgot Password, Diagon Alley, Diagon Alley Reset Password"
      }
    >
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <img src={Logo} width={"100px"} />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Reset your password
          </h2>
          <form className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    required
                  />
                </div>
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={getQuestion}
                    className={
                      securityQuestion
                        ? "hidden"
                        : "bg-gray-900 text-white py-2 px-3 mt-5 rounded"
                    }
                  >
                    Continue
                  </button>
                </div>
              </div>
              <div className={securityQuestion ? "" : "hidden"}>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {securityQuestion}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    value={securityAnswer}
                    onChange={(e) => {
                      setSecurityAnswer(e.target.value);
                    }}
                    placeholder="Answer"
                  />
                </div>
              </div>
              <div className={securityQuestion ? "" : "hidden"}>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    New Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    placeholder="New Password"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={
                    securityQuestion
                      ? "inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      : "hidden"
                  }
                >
                  Reset Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
