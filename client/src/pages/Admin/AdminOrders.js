import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import "../../styles/AdminDashboardStyles.css";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import Loading from "../../components/Loading";
const { Option } = Select;

const AdminOrders = () => {
  const navigate = useNavigate();
  const [status] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");

      if (data?.success) {
        setOrders(data?.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting all orders.");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });

      if (data?.success) {
        toast.success(data?.message);
        getOrders();
        setLoading(false);
      } else {
        toast.error(data?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating order status.");
      setLoading(false);
    }
  };

  //delete order handler
  const handleDelete = async (oId) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/api/v1/auth/delete-order/${oId}`);

      if (data?.success) {
        toast.success(data?.message);
        getOrders();
        setLoading(false);
      } else {
        toast.error(data?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting order.");
      setLoading(false);
    }
  };

  return (
    <Layout title={"Dashboard - All Orders"}>
      <div className="m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 card">
            <div className="heading mt-3 mb-3">
              <h1 className="text-center mb-0">Manage Orders</h1>
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
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                        <td>{o?.amount}</td>
                        <td>
                          <button
                            className="btn btn-secondary"
                            onClick={() => {
                              handleDelete(o._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div>{loading && <Loading />}</div>
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

export default AdminOrders;
