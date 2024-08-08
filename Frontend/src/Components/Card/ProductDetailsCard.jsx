import React from "react";
import { useCartContext } from "../../Api/cartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductDetailsCard = ({ product, id }) => {
  const [cartData, setCartData] = useCartContext();
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl p-10">
      <figure className="w-2/6">
        <img src={`http://localhost:3582/api/v1/products/image/${id}`} />
      </figure>
      <div className="card-body w-4/5 pl-20">
        <h2 className="card-title">{product?.name}</h2>
        <p className="font-medium">Category: {product?.category?.name}</p>
        <p className="w-4/5 mb-4">{product?.desc}</p>
        <p className="font-semibold text-2xl flex items-start mb-4">
          <span className="text-xs">BDT</span> {product?.price}
        </p>
        <p>Quantity: {product?.quantity}</p>
        <div className="card-actions justify-end">
          <button className="btn">Buy Now</button>
          <button
            className="btn"
            onClick={() => {
              setCartData([...cartData, product]);
              localStorage.setItem("cart", JSON.stringify([...cartData, product]));
              toast.success(
                <div className="w-fit">
                  Successfully added to your cart!{" "}
                  <Link
                    to="/cart"
                    className="block hover:underline transition-all text-blue-700"
                  >
                    Go to cart
                  </Link>
                </div>
              );
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
