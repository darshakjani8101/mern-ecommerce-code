import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";
import "../../styles/AdminDashboardStyles.css";
import { Select } from "antd";
import Loading from "../../components/Loading";
const { Option } = Select;

const Users = () => {
  const [role] = useState([0, 1]);
  const [users, setUsers] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-users");

      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting all users.");
    }
  };

  useEffect(() => {
    if (auth?.token) getUsers();
  }, [auth?.token]);

  //update user role handler
  const handleChange = async (userId, value) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/v1/auth/user-role/${userId}`, {
        role: value,
      });

      if (data?.success) {
        toast.success(data?.message);
        getUsers();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating user role.");
      setLoading(false);
    }
  };

  //delete user handler
  const handleDelete = async (uId) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/api/v1/auth/delete-user/${uId}`);

      if (data?.success) {
        toast.success(data.message);
        getUsers();
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting user.");
      setLoading(false);
    }
  };

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 card">
            <div className="heading mt-3 mb-3">
              <h1 className="text-center mb-0">Manage Users</h1>
            </div>
            <div>{!users?.length && <Loading />}</div>
            <div>{loading && <Loading />}</div>
            <div className="border shadow mb-3">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Role</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((u, i) => {
                    return (
                      <tr key={u._id}>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(u._id, value)}
                            defaultValue={u?.role}
                          >
                            {role.map((r, i) => (
                              <Option key={i} value={r}>
                                {r ? "Admin" : "User"}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{u?.name}</td>
                        <td>{u?.email}</td>
                        <td>{u?.phone}</td>
                        <td>{u?.address}</td>
                        <td>
                          <button
                            className="btn btn-secondary"
                            onClick={() => {
                              handleDelete(u._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
