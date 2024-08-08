import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import ProductCard from "../Components/Card/ProductCard";
import Spinner2 from "../Components/Loader/Spinner2";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Prices";
import useCategories from "../hooks/useCategories";

const Home = () => {
  const [products, setProducts] = useState([]);
  const categories = useCategories();
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3582/api/v1/products/products-list/${page}`
      );
      setProducts(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching all products");
    }
  };

  const getTotalProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3582/api/v1/products/total"
      );
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3582/api/v1/products/products-list/${page}`
      );
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    getTotalProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProducts();
    } else if (!checked.length && !radio.length) {
      getAllProducts();
    }
  }, [checked, radio]);

  const handleFilter = (value, id) => {
    try {
      let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        all = all.filter((c) => c !== id);
        setIsFiltered(false);
      }
      setChecked(all);
    } catch (error) {
      console.log(error);
      toast.error("Error in filtering");
    }
  };

  const filterProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:3582/api/v1/products/filter",
        { checked, radio }
      );
      setProducts(data.products);
      setLoading(false);
      setIsFiltered(true);
    } catch (error) {
      console.error(error);
      toast.error("Error in filtering");
    }
  };

  return (
    <>
      <Layout
        titleText="Home | Diagon Alley"
        author={"Abyan"}
        desc={
          "Welcome to the home page of Diagon Alley | It is the world of products! Grab your choice !!"
        }
        keywords={"Diagon Alley Home, Diagon Alley"}
      >
        <div className="flex">
          <div className="w-1/4 h-full p-0 overflow-y-scroll no-scrollbar fixed border-r-2">
            <h6 className="text-center text-xl mt-3 mb-2 font-medium">
              Filter By Category
            </h6>
            <div className="flex flex-col ml-4 space-y-1 mb-10">
              {categories.map((category) => (
                <Checkbox
                  key={category._id}
                  onChange={(e) => handleFilter(e.target.checked, category._id)}
                >
                  {category.name}
                </Checkbox>
              ))}
            </div>
            <h6 className="text-center text-xl my-3 font-medium">
              Filter By Price
            </h6>
            <Radio.Group
              onChange={(e) => {
                setRadio(e.target.value);
              }}
              className="flex flex-col ml-4 space-y-1 mb-10"
            >
              {Prices.map((price) => (
                <Radio key={price._id} value={price.array}>
                  {price.name}
                </Radio>
              ))}
            </Radio.Group>{" "}
            <div className="flex justify-center">
              <button
                className="btn btn-warning"
                onClick={() => {
                  setIsFiltered(false);
                  window.location.reload();
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
          <div className="w-3/4 ml-[27%] mr-[2%] mt-5 ">
            <h1 className="text-center text-4xl font-semibold mb-10">
              All Products
            </h1>
            {loading ? (
              <Spinner2 />
            ) : products.length === 0 ? (
              <p className="font-medium">Sorry, no products found</p>
            ) : (
              <div className="grid grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    desc={product.desc.substring(0, 40) + "..."}
                    price={product.price}
                  />
                ))}
              </div>
            )}
            {products &&
              products.length < total &&
              (loading ? (
                <p className="font-medium">Loading...</p>
              ) : isFiltered ? (
                <></>
              ) : (
                <button
                  className="btn btn-accent mt-5"
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  Load More
                </button>
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
