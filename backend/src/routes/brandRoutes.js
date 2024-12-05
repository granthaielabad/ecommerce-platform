import express from "express";
import {
  createBrand,
  deleteABrand,
  getABrandBySlug,
  getAllBrands,
  updateABrand,
} from "../controllers/brandController.js";

const brandRouter = express.Router();

brandRouter.post("/", createBrand);
brandRouter.get("/all", getAllBrands);
brandRouter.get("/:slug", getABrandBySlug);
brandRouter.put("/:id", updateABrand);
brandRouter.delete("/:id", deleteABrand);

export default brandRouter;
