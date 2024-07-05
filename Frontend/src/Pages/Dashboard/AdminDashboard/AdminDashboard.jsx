import React from "react";
import Layout from "../../../Layout/Layout";
import AdminMenu from "../../../Components/Navigation/AdminMenu";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4">
          <AdminMenu />
        </div>
        <div className="divider divider-horizontal m-0 w-auto"></div>
        <div className="basis-3/4">Content</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
