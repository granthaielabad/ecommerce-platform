import express from "express";
import {
    approveAReview,
  createReview,
  deleteAReview,
  getAReviewById,
  getAllReviews,
  updateAReview,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/all", getAllReviews);
reviewRouter.get("/:id", getAReviewById);
reviewRouter.put("/:id", updateAReview);
reviewRouter.put("/approve-request", approveAReview);
reviewRouter.delete("/:id", deleteAReview);

export default reviewRouter;
