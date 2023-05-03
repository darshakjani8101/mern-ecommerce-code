import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");

      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting all products.");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard - All Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 products">
            <div className="heading mb-2">
              <h1 className="text-center mb-0">Manage Products</h1>
            </div>
            <div className="d-flex flex-wrap">
              {!products?.length && (
                <div className="row w-100">
                  <Loading />
                </div>
              )}
              {products?.map((p) => (
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
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          navigate(`/dashboard/admin/product/${p.slug}`)
                        }
                      >
                        Edit Product
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
