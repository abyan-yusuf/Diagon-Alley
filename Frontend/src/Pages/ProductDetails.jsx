import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import ProductCard from "../Components/Card/ProductCard";
import ProductDetailsCard from "../Components/Card/ProductDetailsCard";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isProductChanged, setIsProductChanged] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3582/api/v1/products/single/${id}`
      );
      setProduct(data.singleProduct);
      console.log(data);
      setIsProductChanged(true);
    } catch (error) {
      console.error(error);
      toast.error(error.error.message);
    }
  };

  const getRelatedProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3582/api/v1/products/related-products/${product?.category?._id}`
      );
      setRelatedProducts(data.relatedProducts.filter((p) => p._id !== id));
      console.log(relatedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getAll = async () => {
      await getProduct();
      if (isProductChanged) {
        getRelatedProducts();
      }
    };
    getAll();
  }, [id, isProductChanged]);

  return (
    <Layout>
      <ProductDetailsCard product={product} id={id} />
      <h2 className="text-center text-3xl font-semibold my-10">
        People also buy
      </h2>
      {relatedProducts.length > 0 && (
        <div className={`grid grid-cols-4 gap-6 mx-10`}>
          {relatedProducts?.map((p) => (
            <ProductCard
              key={p._id}
              id={p._id}
              name={p.name}
              desc={p.desc.substring(0, 40) + "..."}
              price={p.price}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default ProductDetails;
