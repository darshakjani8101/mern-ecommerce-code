import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import LoadingFull from "../../components/LoadingFull";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setLoading(true);

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(res.data));

        setTimeout(() => {
          navigate(location.state || "/");
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Layout title={"Login - Ecommerce App"}>
      {loading && <LoadingFull />}
      {!loading && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2 className="title">Login</h2>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </button>
            </div>
            <div className="mb-3">
              <h6 className="text-center">Don't have an account?</h6>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register Here
              </button>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default Login;
