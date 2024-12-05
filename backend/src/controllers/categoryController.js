import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";
import { Category } from "../models/categoryModel.js";

// @desc Create a new Category
// @router /api/category/
// @access Private

export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({ status: true, data: newCategory });
  } catch (error) {
    console.error("Error in createCategory:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Get all Categorys
// @router /api/category/
// @access Public

export const getAllCategorys = expressAsyncHandler(async (req, res) => {
  try {
    const categorys = await Category.find();
    res.status(201).json({ status: true, data: categorys });
  } catch (error) {
    console.error("Error in getAllCategorys:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Get a Category by Slug
// @router /api/category/:slug
// @access Public

export const getACategoryBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(201).json({ status: true, data: category });
  } catch (error) {
    console.error("Error in getACategory:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Update a Category
// @router /api/category/:id
// @access Private

export const updateACategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      throw new AppError("Category not found", 404);
    }
    res.status(201).json({ status: true, data: category });
  } catch (error) {
    console.error("Error in updateACategory:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Delete a Category
// @router /api/category/:id
// @access Private

export const deleteACategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      throw new AppError("Category not found", 404);
    }
    res.status(201).json({ status: true, message: "Category removed" });
  } catch (error) {
    console.error("Error in deleteACategory:", error);
    throw new AppError("Something went wrong", 400);
  }
});
