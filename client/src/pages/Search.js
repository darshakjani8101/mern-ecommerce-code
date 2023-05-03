import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/SearchStyles.css";

const Search = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [values] = useSearch();

  return (
    <Layout title={"Search Results - Ecommerce App"}>
      <div>
        <div className="row search-top">
          <div className="col-md-12">
            <h3 className="text-center mb-0">Search Results</h3>
            <h6 className="text-center mb-0">
              {values?.results.length < 1
                ? "No products found"
                : `${values?.results.length} products found`}
            </h6>
          </div>
        </div>
        <div className="row search">
          <div className="d-flex flex-wrap">
            {values?.results?.map((p) => (
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

export default Search;
