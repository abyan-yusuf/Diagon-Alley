import React, { useEffect, useState } from "react";
import Layout from "../../../Layout/Layout";
import AdminMenu from "../../../Components/Navigation/AdminMenu";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../Api/authContext";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../Components/Loader/Spinner";
import useCategories from "../../../hooks/useCategories";

const AdminProducts = () => {
  const navigate = useNavigate();
  const categories = useCategories()
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [auth] = useAuthContext();
  const [imagePreview, setImagePreview] = useState(null);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3582/api/v1/products/single/${id}`
      );
      console.log(data.singleProduct);
      setProduct(data.singleProduct);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

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

  const handleDelete = async () => {
    try {
      const answer = window.prompt("Are you sure you want to delete this product", "Yes")
      if (answer !== "Yes") {
        return;
      }
      const {data} = await axios.delete(`http://localhost:3582/api/v1/products/delete/${product._id}`, { headers: { Authorization: auth.token } });
      console.log(data)
      if (data) {
        navigate("/dashboard/admin/product")
        return toast.success(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Error while deleting product")
    }
  }

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const productData = new FormData();
      productData.append("name", data.name);
      productData.append("desc", data.desc);
      productData.append("price", data.price);
      productData.append("category", data.category);
      productData.append("quantity", data.quantity);
      data.image[0] && productData.append("image", data.image[0]);

      const response = await axios.put(
        `http://localhost:3582/api/v1/products/update-product/${id}`,
        productData,
        { headers: { Authorization: auth?.token } }
      );
      console.log(response);
      if (response.data) {
        reset();
          navigate("/dashboard/admin/manage-product");
        return toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (!product) {
    return <Spinner />;
  }

  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4">
          <AdminMenu />
        </div>
        <div className="divider divider-horizontal m-0 w-auto"></div>
        <div className="basis-3/4">
          <h2 className="text-3xl text-center mb-10">Edit {product.name}</h2>
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
                defaultValue={product.name}
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
                ) : (
                  <img
                    src={`http://localhost:3582/api/v1/products/image/${product._id}`}
                    className="h-52"
                    alt="Existing"
                  />
                )}
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
                defaultValue={product.desc}
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
                defaultValue={product.price}
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
                defaultValue={product.category?._id || ""}
              >
                <option disabled value="">
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
                defaultValue={product.quantity}
              />
              {errors.quantity && (
                <span className="text-error">This field is required</span>
              )}
            </div>
            <button type="submit" className="btn mb-8 w-full">
              Submit
            </button>
          </form>
          <button
            onClick={handleDelete}
            className="btn btn-error mb-8 w-10/12 mx-2"
          >
            Delete
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProducts;
