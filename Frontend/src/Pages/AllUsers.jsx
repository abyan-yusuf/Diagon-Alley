import React from 'react'
import Layout from '../Layout/Layout'
import AdminDashboard from './AdminDashboard'
import AdminMenu from '../Components/AdminMenu/AdminMenu';

const AllUsers = () => {
  return (
    <Layout>
      <div className="flex space-x-4">
        <div className="basis-1/4">
          <AdminMenu />
        </div>
        <div className="basis-3/4">All Users</div>
      </div>
    </Layout>
  );
}

export default AllUsers
