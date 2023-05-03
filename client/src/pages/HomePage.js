import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import "../styles/Homepage.css";
import Loading from "../components/Loading";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

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

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");

      if (data?.success) {
        setTotal(data?.total);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting total count.");
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get 1st page products
  const getAllProducts = async () => {
    try {
      // setLoading(true);
      setLoadingProducts(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      // setLoading(false);

      if (data?.success) {
        setProducts(data?.products);
        setLoadingProducts(false);
      }
    } catch (error) {
      // setLoading(false);
      setLoadingProducts(false);
      console.log(error);
      toast.error("Something went wrong while getting all products.");
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, []);

  //load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);

      if (data?.success) {
        setProducts([...products, ...data?.products]);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong while loading more products.");
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //filter by category
  const handleCategoryFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get filtered products
  const filterProduct = async () => {
    try {
      setLoadingProducts(true);
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });

      if (data?.success) {
        setProducts(data?.products);
        setLoadingProducts(false);
        if (checked.length || radio.length) {
          toast.success(data?.message);
        }
      }
    } catch (error) {
      setLoadingProducts(false);
      console.log(error);
      toast.error("Something went wrong while applying filters.");
    }
  };

  useEffect(() => {
    filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"Shop Now - Ecommerce App"}>
      <div>
        <img className="banner-img" src="/images/banner.png" alt="banner" />
      </div>
      <div className="row">
        <div className="col-md-3 filters">
          {/* Category Filter */}
          <h4 className="text-center mt-4">Filter By Category</h4>
          {!categories.length && <Loading />}
          <div className="d-flex flex-column ant-checkbox-wrapper">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleCategoryFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* Price Filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column ant-radio-wrapper">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-4 p-2">
            <button
              className="btn btn-secondary"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9 home-page">
          <div className="row w-100">
            <h1 className="mb-0 text-center">All Products</h1>
          </div>
          {!loadingProducts && !products.length && (
            <div className="row w-100">
              <h5 className="text-center">
                No products available for applied filters.
              </h5>
            </div>
          )}
          {loadingProducts && (
            <div className="row w-100">
              <Loading />
            </div>
          )}
          {!loadingProducts && (
            <div className="row">
              <div className="d-flex flex-wrap">
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
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item added to your cart.");
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="m-3 loadmore text-center">
            {!loading &&
              products &&
              products.length < total &&
              !checked.length &&
              !radio.length && (
                <button
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  Load More
                </button>
              )}
            {loading && (
              <div className="row w-100">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
