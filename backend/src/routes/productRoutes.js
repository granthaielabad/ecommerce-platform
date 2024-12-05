import express from "express";
import {
  createProduct,
  deleteAProduct,
  getAllProducts,
  getVendorProducts,
  updateAProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/vendor/:vendorId", getVendorProducts);
productRouter.put("/:id", updateAProduct);
productRouter.delete("/:id", deleteAProduct);

export default productRouter;
