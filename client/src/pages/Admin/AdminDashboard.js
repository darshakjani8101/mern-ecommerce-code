import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import "../../styles/AdminDashboardStyles.css";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard Admin - Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-5">
            <div className="card p-3">
              <div className="heading mb-3">
                <h1 className="mb-0 text-center">Admin Details</h1>
              </div>
              <h3>Admin Name: {auth?.user?.name}</h3>
              <h3>Admin Email: {auth?.user?.email}</h3>
              <h3>Admin Contact: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
