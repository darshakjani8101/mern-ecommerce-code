import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
import LoadingFull from "../../components/LoadingFull";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setLoading(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce App"}>
      {loading && <LoadingFull />}
      {!loading && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2 className="title">Reset Password</h2>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                className="form-control"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={newPassword}
                className="form-control"
                placeholder="Set Your New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={answer}
                className="form-control"
                placeholder="Which is your favourite game?"
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default ForgotPassword;
