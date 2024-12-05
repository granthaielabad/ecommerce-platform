import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";
import { Brand } from "../models/brandModel.js";

// @desc Create a new Brand
// @router /api/brand/
// @access Private

export const createBrand = expressAsyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.status(201).json({ status: true, data: newBrand });
  } catch (error) {
    console.error("Error in createBrand:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Get all Brands
// @router /api/brand/
// @access Public

export const getAllBrands = expressAsyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(201).json({ status: true, data: brands });
  } catch (error) {
    console.error("Error in getAllBrands:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Get a Brand by Slug
// @router /api/brand/:slug
// @access Public

export const getABrandBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug });
    res.status(201).json({ status: true, data: brand });
  } catch (error) {
    console.error("Error in getABrand:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Update a Brand
// @router /api/brand/:id
// @access Private

export const updateABrand = expressAsyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!brand) {
      throw new AppError("Brand not found", 404);
    }
    res.status(201).json({ status: true, data: brand });
  } catch (error) {
    console.error("Error in updateABrand:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Delete a Brand
// @router /api/brand/:id
// @access Private

export const deleteABrand = expressAsyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      throw new AppError("Brand not found", 404);
    }
    res.status(201).json({ status: true, message: "Brand removed" });
  } catch (error) {
    console.error("Error in deleteABrand:", error);
    throw new AppError("Something went wrong", 400);
  }
});
