import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
import LoadingFull from "../../components/LoadingFull";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
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
    <Layout title={"Register - Ecommerce App"}>
      {loading && <LoadingFull />}
      {!loading && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2 className="title">Register</h2>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                className="form-control"
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                value={password}
                className="form-control"
                placeholder="Set Your Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={phone}
                className="form-control"
                placeholder="Enter Your Phone"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={address}
                className="form-control"
                placeholder="Enter Your Address"
                onChange={(e) => setAddress(e.target.value)}
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
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default Register;
