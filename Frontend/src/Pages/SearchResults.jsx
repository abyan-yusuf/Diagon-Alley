import React from "react";
import Layout from "../Layout/Layout";
import { useSearchContext } from "../Api/searchContext";
import ProductCard from "../Components/Card/ProductCard";

const SearchResults = () => {
  const [values] = useSearchContext();
  return (
    <Layout titleText={`Search Results | Found ${values.results.length}`}>
      <h1 className="text-4xl font-bold text-center mt-5">Search Results</h1>
      <p className="text-center text-lg my-3">Found {values.results.length}</p>
      <div className="grid grid-cols-4 gap-6 mx-10">
        {values.results.map((value) => (
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

export default SearchResults;
