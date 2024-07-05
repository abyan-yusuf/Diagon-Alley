import React, { useEffect, useState } from "react";
import Layout from "../../../Layout/Layout";
import AdminMenu from "../../../Components/Navigation/AdminMenu";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../Api/authContext";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [auth] = useAuthContext();
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const image = watch("image");

  useEffect(() => {
    if (image && image[0]) {
      const objectUrl = URL.createObjectURL(image[0]);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setImagePreview(null);
  }, [image]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const productData = new FormData();
      productData.append("name", data.name);
      productData.append("desc", data.desc);
      productData.append("price", data.price);
      productData.append("category", data.category);
      productData.append("quantity", data.quantity);
      productData.append("image", data.image[0]);

      const response = await axios.post(
        "http://localhost:3582/api/v1/products/create-product",
        productData,
        { headers: { Authorization: auth?.token } }
      );
      console.log(response);
      if (response.data) {
        reset();
          navigate("/dashboard/admin/manage-product");
        return toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3582/api/v1/categories/categories"
      );
      console.log(response.data.category);
      setCategories(response.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4">
          <AdminMenu />
        </div>
        <div className="basis-3/4">
          <h2 className="text-3xl text-center mb-10">Create Product</h2>
          <form
            className="w-10/12 flex flex-col mx-2 form-control"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-8 w-full">
              <label className="mb-5">
                <div className="text-xl">Name</div>
              </label>
              <input
                type="text"
                placeholder="New Product Name"
                className="input input-bordered w-full h-14"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-error">This field is required</span>
              )}
            </div>
            <div className="mb-8 w-full">
              <label className="mb-5">
                <div className="text-xl">Image</div>
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full h-14 mb-5"
                {...register("image")}
              />
              <div className="flex justify-center">
                {imagePreview ? (
                  <img src={imagePreview} className="h-52" alt="Selected" />
                ) : <></>}
              </div>
            </div>
            <div className="mb-8 w-full">
              <label className="mb-5">
                <div className="text-xl">Description</div>
              </label>
              <textarea
                type="text"
                placeholder="New Product Description"
                className="textarea textarea-bordered textarea-lg p-3 w-full"
                {...register("desc", { required: true })}
              />
              {errors.desc && (
                <span className="text-error">This field is required</span>
              )}
            </div>
            <div className="mb-8 w-full">
              <label className="mb-5">
                <div className="text-xl">Price</div>
              </label>
              <input
                type="number"
                placeholder="New Product Price"
                className="input input-bordered w-full h-14"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <span className="text-error">This field is required</span>
              )}
            </div>
            <div className="mb-8 w-full">
              <label className="mb-5">
                <div className="text-xl">Category</div>
              </label>
              <select
                className="select select-bordered w-full h-14"
                {...register("category", { required: true })}
              >
                <option selected disabled value="">
                  Select a category
                </option>
                {categories.map((c) => (
                  <option value={c._id} key={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-error">This field is required</span>
              )}
            </div>
            <div className="mb-8 w-full">
              <label className="mb-5">
                <div className="text-xl">Quantity</div>
              </label>
              <input
                type="number"
                placeholder="New Product Quantity"
                className="input input-bordered w-full h-14"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && (
                <span className="text-error">This field is required</span>
              )}
            </div>
            <button type="submit" className="btn mb-8 w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProducts;
