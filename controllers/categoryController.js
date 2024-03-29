import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

//create category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(200).send({ message: "Name is required." });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already exists.",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "New category created.",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating a category.",
      error,
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
      return res.status(200).send({ message: "Name is required." });
    }

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    if (!category) {
      return res.status(200).send({
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category updated successfully.",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating a category.",
      error,
    });
  }
};

//get all categories
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});

    res.status(200).send({
      success: true,
      message: "List of all categories.",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all categories.",
      error,
    });
  }
};

//get single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });

    if (!category) {
      return res.status(200).send({
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully found a category.",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single category.",
      error,
    });
  }
};

//delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Successfully deleted a category.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting a category.",
      error,
    });
  }
};
