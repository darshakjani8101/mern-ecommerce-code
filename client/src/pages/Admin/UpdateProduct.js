import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
import Loading from "../../components/Loading";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loading, setLoading] = useState(false);

  //get single product
  const getSingleProduct = async () => {
    try {
      setLoadingProduct(true);
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );

      if (data?.success) {
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setCategory(data.product.category._id);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);
        setId(data.product._id);
        setLoadingProduct(false);
      } else {
        toast.error(data.message);
        setLoadingProduct(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting a product detail.");
      setLoadingProduct(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");

      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting all categories.");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const productData = new FormData();

      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      photo && productData.append("photo", photo);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success(data?.message);
        setLoading(false);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating a product.");
      setLoading(false);
    }
  };

  //delete product function
  const handleDelete = async () => {
    try {
      setLoading(true);
      // let answer = window.prompt("Type 'yes' to delete the selected product.");
      // if (!answer) return;

      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success(data?.message);
        setLoading(false);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting a product.");
      setLoading(false);
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-5 card">
            <div className="heading mt-3 mb-2">
              <h1 className="text-center mb-0">Update Product</h1>
            </div>
            <div>{loadingProduct && <Loading />}</div>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  ></input>
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="update-product"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    {id && (
                      <img
                        src={`/api/v1/product/product-photo/${id}`}
                        alt="update-product"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter product name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Enter product description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter product price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter product quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value={false}>No</Option>
                  <Option value={true}>Yes</Option>
                </Select>
              </div>
              {!loading && (
                <>
                  <div className="mb-3">
                    <button
                      className="btn btn-primary w-100"
                      onClick={handleUpdate}
                    >
                      Edit Product
                    </button>
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-secondary w-100"
                      onClick={handleDelete}
                    >
                      Delete Product
                    </button>
                  </div>
                </>
              )}
              <div>{loading && <Loading />}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
