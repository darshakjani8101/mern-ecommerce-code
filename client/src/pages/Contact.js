import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us - Ecommerce App"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contact us"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-secondary p-2 text-white text-center">
            Contact Us
          </h1>
          <p className="text-justify mt-2">
            Are you looking to boost your content marketing and SEO results?
            Discover dozens of unique insights on creating and promoting
            high-performing content.
          </p>
          <p className="mt-3">
            <BiMailSend /> : ecommerce.app@email.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 079-123456
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-1234-5678
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
