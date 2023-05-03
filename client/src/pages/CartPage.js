import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import "../styles/CartStyles.css";
import Loading from "../components/Loading";

const CartPage = () => {
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while calculating total price.");
    }
  };

  //delete cart item
  const removeCartItem = (index) => {
    try {
      let myCart = [...cart];
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed from your cart.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting cart item.");
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      if (data?.success) {
        setClientToken(data?.response?.clientToken);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting payment token.");
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });

      setLoading(false);
      if (data?.success) {
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/orders");
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong while making payment.");
    }
  };

  return (
    <Layout title={"Your Cart - Ecommerce App"}>
      <div>
        <div className="row cart-top">
          <div className="col-md-12">
            <h3 className="text-center mb-0">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h3>
            <h6 className="text-center mb-0">
              {cart?.length
                ? `You have ${cart?.length} items in your cart. ${
                    auth?.token ? "" : "Please login to checkout."
                  }`
                : "Your cart is empty."}
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 cart-page">
            <div className="d-flex flex-wrap">
              {cart?.map((p, i) => (
                <div className="card m-2" key={i}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-price">₹{p.price}</p>
                    </div>
                    <p className="card-text">
                      {p.description.substring(0, 30)}
                    </p>
                    <div className="buttons mt-2">
                      <button
                        className="btn btn-secondary"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(i)}
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3 cart-summary">
            <h2>Cart Summary</h2>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <p className="mb-0 address">Delivery Address</p>
                  <p className="mb-0">{auth?.user?.address}</p>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
            <div className="m-2">
              {!clientToken || !cart.length || !auth?.user?.address ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  {!loading && (
                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance}
                    >
                      Make Payment
                    </button>
                  )}
                  {loading && <Loading />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
