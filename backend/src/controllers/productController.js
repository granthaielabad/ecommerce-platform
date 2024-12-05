import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";
import { Product } from "../models/productModel.js";

// Create a new product
export const createProduct = expressAsyncHandler(async (req, res) => {
  const {
    name,
    price,
    stock,
    description,
    vendor,
    category,
    subcategory,
    brand,
    isFeatured,
  } = req.body;

  // Validate required fields
  if (!name || !price || !vendor) {
    res.status(400);
    throw new AppError("Name, Price, and Vendor are required");
  }

  try {
    const newProduct = await Product.create({
      name,
      price,
      stock,
      description,
      vendor,
      category,
      subcategory,
      brand,
      isFeatured,
    });

    res.status(201).json({ status: true, data: newProduct });
  } catch (error) {
    console.error("Error in createProduct:", error);
    throw new AppError("Error creating product", 500);
  }
});

// Get all products
export const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ status: true, data: products });
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// Get a single product by slug
export const getAProductBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    res.status(200).json({ status: true, data: product });
  } catch (error) {
    console.error("Error in getAProductBySlug:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// Update a product by ID
export const updateAProduct = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    res.status(200).json({ status: true, data: product });
  } catch (error) {
    console.error("Error in updateAProduct:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// Delete a product by ID
export const deleteAProduct = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    res.status(200).json({ status: true, message: "Product removed" });
  } catch (error) {
    console.error("Error in deleteAProduct:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// Get featured products
export const getFeaturedProducts = expressAsyncHandler(async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).limit(4);
    res.status(200).json({ status: true, data: featuredProducts });
  } catch (error) {
    console.error("Error in getFeaturedProducts:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// Get products by vendor
export const getVendorProducts = expressAsyncHandler(async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    const products = await Product.find({ vendor: vendorId });

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No products found for this vendor." });
    }

    res.status(200).json({ status: true, data: products });
  } catch (error) {
    console.error("Error in getVendorProducts:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
});
