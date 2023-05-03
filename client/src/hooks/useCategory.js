import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");

      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting all categories.");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return categories;
}
