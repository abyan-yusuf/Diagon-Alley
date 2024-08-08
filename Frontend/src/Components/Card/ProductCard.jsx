import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ name, price, desc, id }) => {
  return (
    <Link
      className="card bg-base-100 w-auto shadow-xl hover:-translate-y-3 transition-transform duration-500"
      to={`/details/${id}`}
    >
      <figure>
        <img
          src={`http://localhost:3582/api/v1/products/image/${id}`}
          alt="Shoes"
          className="h-52"
        />
      </figure>
      <div className="card-body">
        <h2 className="text-md font-semibold mb-1">
          {name.substring(0, 20) + (name.length > 20 ? "..." : "")}
        </h2>
        <p>{desc}</p>
        <p className="font-semibold text-2xl flex items-start"> <span className="text-xs">BDT</span> {price}</p>
        <div className="card-actions justify-end">
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
