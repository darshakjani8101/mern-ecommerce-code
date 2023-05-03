import React from "react";

const CategoryForm = ({ type, handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {type === "create" ? "Create Category" : "Update Category"}
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
