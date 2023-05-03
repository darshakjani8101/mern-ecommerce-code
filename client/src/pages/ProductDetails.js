import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import "../styles/ProductDetailsStyles.css";
import Loading from "../components/Loading";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  //get product details
  const getProduct = async () => {
    try {
      setLoadingProduct(true);
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );

      if (data?.success) {
        setProduct(data?.product);
        getSimilarProducts(data?.product._id, data?.product.category._id);
        setLoadingProduct(false);
      } else {
        toast.error(data?.message);
        setLoadingProduct(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting product details.");
      setLoadingProduct(false);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      setLoadingSimilar(true);
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data.products);
      setLoadingSimilar(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting similar products.");
      setLoadingSimilar(false);
    }
  };

  return (
    <Layout title={"Product Details - Ecommerce App"}>
      <div className="row product-top">
        <div className="col-md-12">
          <h3 className="text-center mb-0">Product - {product.name}</h3>
        </div>
      </div>
      {loadingProduct && (
        <div className="row">
          <Loading />
        </div>
      )}
      <div className="row container mt-2 product-details">
        <div className="col-md-4">
          {product?._id && (
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              style={{ height: "300px", width: "300px" }}
            />
          )}
        </div>
        <div className="col-md-8 product-details-info">
          <h3>Product Details</h3>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Category: {product?.category?.name}</h6>
          <h6>Price: ₹{product.price}</h6>
          <button
            className="btn btn-primary ms-2"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item added to your cart.");
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
      <div className="row mt-2 product-top">
        <div className="col-md-12">
          <h4 className="text-center mb-0">
            Products similar to {product.name}
          </h4>
          {relatedProducts.length < 1 && (
            <h6 className="text-center mb-0">No similar products found.</h6>
          )}
        </div>
      </div>
      {loadingSimilar && (
        <div className="row">
          <Loading />
        </div>
      )}
      <div className="row similar-products">
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
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
                <p className="card-text">{p.description.substring(0, 30)}</p>
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
    </Layout>
  );
};

export default ProductDetails;
