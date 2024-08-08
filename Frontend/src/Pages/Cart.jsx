import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useCartContext } from "../Api/cartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Api/authContext";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const [cartData, setCartData] = useCartContext();
  const navigate = useNavigate();
  const [auth] = useAuthContext();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(" ");

  const getClientToken = async () => {
    try {
      const { data } = await axios.get(
        "https://diagon-alley-p4xm.onrender.com/api/v1/products/braintree/token"
      );
      setClientToken(data?.clientToken);
      console.log(data?.clientToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClientToken();
  }, [auth?.token]);

  const getTotalPrice = () => {
    let total = 0;
    cartData.map((item) => (total += item?.price));
    return total;
  };

  const handlePayment = async () => {
    try {
      // if (instance.length < 2) {
      //   console.error("Drop-in instance not available");
      //   return;
      // }
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:3582/api/v1/products/braintree/payment",
        { nonce, cartData }
      );
      localStorage.removeItem("cart");
      setCartData([]);
      toast.success("Successfully created order");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <div className={`mx-20 ${cartData.length ? "flex space-x-10" : ""} mt-5`}>
        {cartData.length ? (
          <>
            <div className="w-3/4">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.map((p) => (
                      <tr key={p._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar h-20">
                              <img
                                src={`http://localhost:3582/api/v1/products/image/${p?._id}`}
                                alt={p?.name + " image"}
                              />
                            </div>
                            <div>
                              <div className="font-bold">{p?.name}</div>
                              <div className="text-sm opacity-50">
                                {p?.category?.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{p?.price} Taka</td>
                        <td>{p?.quantity}</td>
                        <th>
                          <Link
                            className="btn btn-ghost btn-xs"
                            to={`/details/${p?._id}`}
                          >
                            Details
                          </Link>
                          <button
                            className="btn btn-error btn-xs"
                            onClick={() => {
                              let myCart = [...cartData];
                              let index = myCart.findIndex(
                                (item) => item.id === p.id
                              );
                              myCart.splice(index, 1);
                              setCartData(myCart);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify(myCart)
                              );
                            }}
                          >
                            Remove
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-1/4">
              <h1 className="text-3xl mb-2 text-center">Cart Summary</h1>
              <p className="text-center">Total | Checkout | Payment</p>
              <div className="divider" />
              <p className="flex justify-between font-medium mb-2">
                <span className="text-left">Subtotal({cartData.length})</span>
                <span className="text-right">{"৳" + getTotalPrice()}</span>
              </p>
              <p className="flex justify-between font-medium mb-2">
                <span className="text-left">Shipping</span>
                <span className="text-right">৳50</span>
              </p>
              <p className="flex justify-between font-medium">
                <span className="text-left">Total</span>
                <span className="text-right">
                  {"৳" + (getTotalPrice() + 50)}
                </span>
              </p>
              {auth.token ? (
                <>
                  <p className="font-medium mt-3">
                    Current Address: <br />
                    <span className="text-indigo-800">
                      {auth?.user?.address}
                    </span>
                  </p>
                  <button
                    className="btn mt-2"
                    onClick={() => {
                      navigate(
                        `/dashboard/${
                          auth?.user?.admin ? "admin" : "user"
                        }/profile`
                      );
                    }}
                  >
                    Update Address
                  </button>
                </>
              ) : (
                <button
                  className="btn mt-2"
                  onClick={() => {
                    navigate("/signin", {
                      state: "/cart",
                    });
                  }}
                >
                  Sign in to continue
                </button>
              )}
              <div className="mt-5">
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) =>
                    console.log("DropIn instance", instance)
                  }
                />
                <button className="btn btn-primary" onClick={handlePayment}>
                  Make Payment
                </button>
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-center text-3xl font-bold">
            {"Hello, " + auth?.user?.name}! Your cart is empty.{" "}
            <Link className="btn btn-link text-3xl text-black" to={"/"}>
              See All Products
            </Link>
          </h1>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
