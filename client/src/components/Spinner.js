import React, { useState, useEffect } from "react";
import Layout from "./Layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);

    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <Layout>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5>Redirecting to you in {count} seconds.</h5>
      </div>
    </Layout>
  );
};

export default Spinner;
