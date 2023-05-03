import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/UserDashboardStyles.css";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <div className="heading">
            <h4 className="mb-0">Dashboard</h4>
          </div>
          <NavLink
            to="/dashboard/user/details"
            className="list-group-item list-group-item-action"
          >
            User Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Manage Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Your Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
