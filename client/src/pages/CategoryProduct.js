import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import "../styles/CategoryProductStyles.css";
import LoadingFull from "../components/LoadingFull";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);

  //get products by category
  const getProductsByCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );

      if (data?.success) {
        setProducts(data?.products);
        setCategory(data?.category);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(
        "Something went wrong while getting products for selected category."
      );
    }
  };

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);

  return (
    <Layout title={"Products by Category"}>
      <div>
        <div className="row category-top">
          <div className="col-md-12">
            <h3 className="text-center mb-0">Category - {category?.name}</h3>
            <h6 className="text-center mb-0">
              {products?.length} products found
            </h6>
          </div>
        </div>
        {loading && (
          <div className="row">
            <LoadingFull />
          </div>
        )}
        <div className="row category">
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
      </div>
    </Layout>
  );
};

export default CategoryProduct;
