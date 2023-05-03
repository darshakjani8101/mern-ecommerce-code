import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-secondary text-light p-3 footer">
      <h6 className="text-center">All Rights Reserved &copy; Techinfoyt</h6>
      <p className="text-center mb-0">
        <Link to="/about">About Us</Link>|<Link to="/contact">Contact Us</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
