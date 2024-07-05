import React from "react";
import Layout from "../../../Layout/Layout";
import UserMenu from "../../../Components/Navigation/UserMenu";

const Orders = () => {
  return (
    <Layout
      titleText={"Manage Orders | User Dashboard | Diagon Alley"}
      author={"Abyan"}
      description={"This is the order management page! Manage your orders here!!"}
      keywords={"Order Management, Diagon Alley, Diagon Alley Order Management"}
    >
      <div className="flex space-x-4 mt-10 ml-7">
        <div className="basis-1/4">
          <UserMenu />
        </div>
        <div className="basis-3/4">Orders</div>
      </div>
    </Layout>
  );
};

export default Orders;
