import expressAsyncHandler from "express-async-handler";
import { Vendor } from "../models/vendorModel.js";
import { AppError } from "../middlewares/errorHandler.js";

// @desc Create a new Vendor
// @route POST /api/vendors
// @access Private
export const createVendor = expressAsyncHandler(async (req, res) => {
  try {
    const { storeName, user } = req.body;

    // Ensure required fields are provided
    if (!storeName || !user) {
      throw new AppError("Store name and user are required", 400);
    }

    // Check if storeName already exists
    const existingVendor = await Vendor.findOne({ storeName });
    if (existingVendor) {
      throw new AppError("Store name already exists", 400);
    }

    const newVendor = await Vendor.create(req.body);
    res.status(201).json({ status: true, data: newVendor });
  } catch (error) {
    throw new AppError(error.message || "Something went wrong", 400);
  }
});

// @desc Get all Vendors
// @route GET /api/vendors
// @access Public
export const getVendors = expressAsyncHandler(async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("user", "-password");
    res.status(200).json({ status: true, data: vendors });
  } catch (error) {
    throw new AppError("Failed to retrieve vendors", 400);
  }
});

// @desc Get Vendor by Slug
// @route GET /api/vendors/:slug
// @access Public
export const getVendorBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ slug: req.params.slug }).populate(
      "user",
      "-password"
    );

    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }

    res.status(200).json({ status: true, data: vendor });
  } catch (error) {
    throw new AppError("Failed to retrieve vendor", 400);
  }
});

// @desc Update Vendor
// @route PUT /api/vendors/:id
// @access Private
export const updateVendor = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }

    res.status(200).json({ status: true, data: vendor });
  } catch (error) {
    throw new AppError("Failed to update vendor", 400);
  }
});

// @desc Delete Vendor
// @route DELETE /api/vendors/:id
// @access Private
export const deleteVendor = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }

    res.status(200).json({ status: true, message: "Vendor removed" });
  } catch (error) {
    throw new AppError("Failed to delete vendor", 400);
  }
});
