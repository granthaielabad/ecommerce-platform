import express from "express";
import {
  createSubCategory,
  deleteASubCategory,
  getASubCategoryBySlug,
  getAllSubCategorys,
  updateASubCategory,
} from "../controllers/subCategoryController.js";

const subCategoryRouter = express.Router();

subCategoryRouter.post("/", createSubCategory);
subCategoryRouter.get("/all", getAllSubCategorys);
subCategoryRouter.get("/:slug", getASubCategoryBySlug);
subCategoryRouter.put("/:id", updateASubCategory);
subCategoryRouter.delete("/:id", deleteASubCategory);

export default subCategoryRouter;
