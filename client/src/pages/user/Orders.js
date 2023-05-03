import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import "../../styles/UserDashboardStyles.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");

      if (data?.success) {
        setOrders(data?.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting your orders.");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard - Your Orders"}>
      <div className="m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 card">
            <div className="heading mt-3 mb-3">
              <h1 className="text-center mb-0">Your Orders</h1>
            </div>
            {!orders?.length && <Loading />}
            {orders?.map((o, i) => {
              return (
                <div className="border shadow mb-3" key={o._id}>
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Time</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                        <td>{o?.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container products">
                    <div className="d-flex flex-wrap">
                      {o?.products?.map((p, i) => (
                        <div className="card m-2" key={p._id}>
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
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
