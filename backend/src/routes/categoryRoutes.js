import express from "express";
import {
  createCategory,
  deleteACategory,
  getACategoryBySlug,
  getAllCategorys,
  updateACategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/all", getAllCategorys);
categoryRouter.get("/:slug", getACategoryBySlug);
categoryRouter.put("/:id", updateACategory);
categoryRouter.delete("/:id", deleteACategory);

export default categoryRouter;
