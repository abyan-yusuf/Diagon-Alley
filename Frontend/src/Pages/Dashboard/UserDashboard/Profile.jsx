import React from "react";
import Layout from "../../../Layout/Layout";
import UserMenu from "../../../Components/Navigation/UserMenu";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../../Api/authContext";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const [auth, setAuth] = useAuthContext();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (info) => {
    console.log({ ...info, email: auth.user.email });

    try {
      const { data } = await axios.put(
        `http://localhost:3582/api/v1/users/update`,
        {
          name: info?.name,
          email: auth?.user?.email,
          password: info?.password,
          phone: info?.phone,
          address: info?.address,
          id: auth?.user?._id
        }
      );

      console.log(data);
      toast.success(data?.message);
      setAuth({...auth ,user:data?.updatedUser});
      let ls = localStorage.getItem('auth')
      ls = JSON.parse(ls)
      ls.allInfo = data.updatedUser
      localStorage.setItem('auth', JSON.stringify(ls))
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="flex space-x-4">
        <div className="basis-1/4">
          <UserMenu />
        </div>
        <div className="basis-3/4 mt-10">
          <form onSubmit={handleSubmit(onSubmit)} className="mx-10">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Full Name{" "}
                </label>
                <div className="mt-2">
                  <input
                    defaultValue={auth?.user?.name}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 Topaz Labs' Gigapixel AIfocus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    {...register("name")}
                  />
                </div>
              </div>
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
                    value={auth?.user?.email}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    disabled
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="address"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Street Address{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    defaultValue={auth?.user?.address}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Address"
                    id="address"
                    {...register("address")}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="phone"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Phone{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    defaultValue={auth?.user?.phone}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="tel"
                    placeholder="Phone"
                    id="phone"
                    {...register("phone")}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    required
                    placeholder="Password"
                    id="password"
                    {...register("password")}
                  />
                </div>
                <Link className="text-sm font-medium" to={"/forgot-password"}>
                  Forgot Password?
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Update Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
