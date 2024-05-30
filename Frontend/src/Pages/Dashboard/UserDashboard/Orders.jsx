import React from 'react'
import Layout from '../../../Layout/Layout'
import UserMenu from '../../../Components/Navigation/UserMenu';

const Orders = () => {
  return (
    <Layout>
      <div className="flex space-x-4 mt-10 ml-7">
        <div className="basis-1/4">
          <UserMenu />
        </div>
        <div className="basis-3/4">Orders</div>
      </div>
    </Layout>
  );
}

export default Orders
