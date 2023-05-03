import React from "react";
import { useSearch } from "../../context/search";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!values.keyword) {
        toast.error("Search keyword is required.");
      } else {
        const { data } = await axios.get(
          `/api/v1/product/search/${values.keyword}`
        );
        if (data?.message) {
          setValues({ ...values, results: data?.results });
          navigate("/search");
        } else {
          toast.error(data?.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while searching products.");
    }
  };

  return (
    <div className="mt-1">
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-secondary" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
