import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createVendor,
  deleteVendor,
  getVendorBySlug,
  getVendors,
  updateVendor,
} from "../controllers/vendorController.js";
import { createProduct } from "../controllers/productController.js";

const vendorRouter = express.Router();

vendorRouter.post("/", createVendor);

vendorRouter.post("/products", protect, createProduct);
vendorRouter.get("/all", getVendors);
vendorRouter.get("/:slug", getVendorBySlug);
vendorRouter.put("/:id", updateVendor);
vendorRouter.delete("/:id", deleteVendor);

export default vendorRouter;
