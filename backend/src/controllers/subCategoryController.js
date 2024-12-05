import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";
import { SubCategory } from "../models/subCategoryModel.js";

// @desc Create a new SubCategory
// @router /api/subcategory/
// @access Private

export const createSubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newSubCategory = await SubCategory.create(req.body);
    res.status(201).json({ status: true, data: newSubCategory });
  } catch (error) {
    console.error("Error in createSubCategory:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Get all SubCategorys
// @router /api/subcategory/
// @access Public

export const getAllSubCategorys = expressAsyncHandler(async (req, res) => {
  try {
    const subcategorys = await SubCategory.find();
    res.status(201).json({ status: true, data: subcategorys });
  } catch (error) {
    console.error("Error in getAllSubCategorys:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Get a SubCategory by Slug
// @router /api/subcategory/:slug
// @access Public

export const getASubCategoryBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const subcategory = await SubCategory.findOne({ slug: req.params.slug });
    res.status(201).json({ status: true, data: subcategory });
  } catch (error) {
    console.error("Error in getASubCategory:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Update a SubCategory
// @router /api/subcategory/:id
// @access Private

export const updateASubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!subcategory) {
      throw new AppError("SubCategory not found", 404);
    }
    res.status(201).json({ status: true, data: subcategory });
  } catch (error) {
    console.error("Error in updateASubCategory:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Delete a SubCategory
// @router /api/subcategory/:id
// @access Private

export const deleteASubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subcategory) {
      throw new AppError("SubCategory not found", 404);
    }
    res.status(201).json({ status: true, message: "SubCategory removed" });
  } catch (error) {
    console.error("Error in deleteASubCategory:", error);
    throw new AppError("Something went wrong", 400);
  }
});
