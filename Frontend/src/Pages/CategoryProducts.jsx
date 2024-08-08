import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import ProductCard from "../Components/Card/ProductCard";

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const { cid } = useParams();

  const getProductsAndCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3582/api/v1/products/${cid}`
      );
      setProducts(data.products);
      setCategory(data.category);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProductsAndCategory();
  }, [cid]);
  return (
    <Layout>
      <h1 className="text-5xl font-semibold text-center">{category?.name}</h1>
      <p className="text-center text-lg my-5">Found {products?.length}</p>
      <div className="grid grid-cols-4 gap-6 mx-10">
        {products.map((value) => (
          <ProductCard
            key={value._id}
            id={value._id}
            name={value.name}
            desc={value.desc.substring(0, 40) + "..."}
            price={value.price}
          />
        ))}
      </div>
    </Layout>
  );
};

export default CategoryProducts;
