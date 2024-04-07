import React from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex justify-end">
        <Link to={"/"} className="hover:text-red-700 me-5">
          Home
        </Link>
      </div>
    </Layout>
  );
};

export default Dashboard;
