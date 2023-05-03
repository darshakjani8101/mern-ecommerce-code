import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import LoadingFull from "../components/LoadingFull";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories - Ecommerce App"}>
      <div className="d-flex flex-wrap row pt-3 ps-2">
        {!categories?.length && <LoadingFull />}
        {categories?.map((c) => (
          <div className="m-3 col-md-2" key={c._id}>
            <Link
              to={`/category/${c.slug}`}
              className="btn btn-outline-secondary category-btn p-4"
            >
              {c.name}
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
