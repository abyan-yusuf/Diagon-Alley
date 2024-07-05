import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ name, price, desc, id }) => {
  return (
    <Link
      className="card grid-col bg-base-100 w-auto shadow-xl"
      to={`/details/${id}`}
    >
      <figure>
        <img
          src={`http://localhost:3582/api/v1/products/image/${id}`}
          alt="Shoes"
          className="h-72"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{desc}</p>
        <p>{price}&#2547;</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
