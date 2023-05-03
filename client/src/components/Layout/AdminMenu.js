import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/AdminDashboardStyles.css";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <div className="heading">
            <h4 className="mb-0">Admin Panel</h4>
          </div>
          <NavLink
            to="/dashboard/admin/details"
            className="list-group-item list-group-item-action"
          >
            Admin Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Manage Categories
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Manage Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Manage Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Manage Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
