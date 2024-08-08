import React from "react";
import Layout from "../../../Layout/Layout";
import UserMenu from "../../../Components/Navigation/UserMenu";
import { useAuthContext } from "../../../Api/authContext";

const Dashboard = () => {
  const [auth] = useAuthContext();
  return (
    <Layout>
      <div className="flex space-x-4">
        <div className="basis-1/4">
          <UserMenu />
        </div>
        <div className="basis-[72%] border-2 rounded-lg mt-10 p-5">
          <h1 className="text-2xl text-center font-medium">
            Hello! {auth?.user?.name.split(" ")[0]}
          </h1>
          <br />
          <p className="font-medium mb-5">
            Manage Your Acount and Orders Here!
          </p>
          <h3 className="text-lg font-medium">User Information:</h3>
          <h5>Name: {auth?.user?.name}</h5>
          <h5>Email: {auth?.user?.email}</h5>
          <h5>Street Address: {auth?.user?.address}</h5>
          <h5>Phone: {auth?.user?.phone}</h5>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
