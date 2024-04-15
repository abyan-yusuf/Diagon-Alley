import React from 'react'
import Layout from '../Layout/Layout'
import AdminMenu from '../Components/AdminMenu/AdminMenu';

const CreateProduct = () => {
  return (
    <Layout>
      <div className="flex space-x-4">
        <div className="basis-1/4">
          <AdminMenu />
        </div>
        <div className="basis-3/4">Create Product</div>
      </div>
    </Layout>
  );
}

export default CreateProduct
