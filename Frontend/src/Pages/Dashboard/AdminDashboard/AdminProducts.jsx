import React, { useEffect, useState } from "react";
import Layout from "../../../Layout/Layout";
import AdminMenu from "../../../Components/Navigation/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner2 from "../../../Components/Loader/Spinner2";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:3582/api/v1/products/"
      );
      console.log(data);
      setProducts(data.allProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching all products");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4">
          <AdminMenu />
        </div>
        <div className="basis-3/4 ml-2">
          <h2 className="text-3xl text-center ">Manage Products</h2>
          <div className="flex mt-10 mb-5 justify-between mr-5">
            <h3 className="text-xl text-left">All Products List</h3>
            <Link className="btn" to={"/dashboard/admin/create-product"}>
              Add Product
            </Link>
          </div>
          {loading ? (
            <Spinner2 />
          ) : (
            <div className="grid grid-cols-3 gap-10 mb-5">
              {products.map((product) => (
                <Link
                  class="card bg-base-100 w-auto shadow-xl"
                  to={`/dashboard/admin/product/${product._id}`}
                >
                  <figure>
                    <img
                      src={`http://localhost:3582/api/v1/products/image/${product._id}`}
                      alt={`${product.name} Image`}
                      className="h-72 w-auto"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {product.name}
                    </h2>
                    <p className="opacity-70">{product.category.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminProducts;
