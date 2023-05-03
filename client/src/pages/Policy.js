import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - Ecommerce App"}>
      <div className="row policy">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contact us"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-secondary p-2 text-white text-center">
            Privacy Policy
          </h1>
          <p className="text-justify mt-2">
            Are you looking to boost your content marketing and SEO results?
            Discover dozens of unique insights on creating and promoting
            high-performing content.
          </p>
          <p className="text-justify mt-2">
            Are you looking to boost your content marketing and SEO results?
            Discover dozens of unique insights on creating and promoting
            high-performing content.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
