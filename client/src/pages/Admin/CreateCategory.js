import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import "../../styles/AdminDashboardStyles.css";
import Loading from "../../components/Loading";

const CreateCategory = () => {
  const [categories, setCategories] = useState();
  const [name, setName] = useState();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [loading, setLoading] = useState(false);

  //Create category form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });

      if (data?.success) {
        toast.success(data.message);
        getAllCategory();
        setName("");
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating new category.");
      setLoading(false);
    }
  };

  //get all categories
  const getAllCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/category/get-category");

      if (data?.success) {
        setCategories(data?.category);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting all categories.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category form handler
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );

      if (data?.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating category.");
      setLoading(false);
    }
  };

  //delete category handler
  const handleDelete = async (pId) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );

      if (data?.success) {
        toast.success(data.message);
        getAllCategory();
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting category.");
      setLoading(false);
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-5 card">
            <div className="heading mt-3">
              <h1 className="mb-0 text-center">Manage Categories</h1>
            </div>
            <hr />
            <div className="p-3">
              <CategoryForm
                type={"create"}
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <hr />
            {loading && <Loading />}
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => {
                    return (
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-secondary ms-2"
                            onClick={() => {
                              handleDelete(c._id);
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
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                type={"update"}
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
