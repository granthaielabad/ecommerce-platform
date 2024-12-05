import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";
import { Review } from "../models/reviewModel.js";

// @desc Create a new Review
// @router /api/review/
// @access Private

export const createReview = expressAsyncHandler(async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json({ status: true, data: newReview });
  } catch (error) {
    console.error("Error in createReview:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Get all Reviews
// @router /api/review/
// @access Public

export const getAllReviews = expressAsyncHandler(async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(201).json({ status: true, data: reviews });
  } catch (error) {
    console.error("Error in getAllReviews:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Get a Review by Id
// @router /api/review/:id
// @access Public

export const getAReviewById = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    res.status(201).json({ status: true, data: review });
  } catch (error) {
    console.error("Error in getAReview:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Update a Review
// @router /api/review/:id
// @access Private

export const updateAReview = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!review) {
      throw new AppError("Review not found", 404);
    }
    res.status(201).json({ status: true, data: review });
  } catch (error) {
    console.error("Error in updateAReview:", error);
    throw new AppError("Something went wrong", 400);
  }
});

// @desc Delete a Review
// @router /api/review/:id
// @access Private

export const deleteAReview = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      throw new AppError("Review not found", 404);
    }
    res.status(201).json({ status: true, message: "Review removed" });
  } catch (error) {
    console.error("Error in deleteAReview:", error);
    throw new AppError("Something went wrong", 400);
  }
});



// @desc Update is Approved
// @router /api/review/approve-request
// @access Private

export const approveAReview = expressAsyncHandler(async (req, res) => {
    try {
      const review = await Review.findByIdAndUpdate(req.params.id, {isApproved:req.body.isApproved}, {
        new: true,
      });
      if (!review) {
        throw new AppError("Review not found", 404);
      }
      res.status(201).json({ status: true, message: "Review updated" });
    } catch (error) {
      console.error("Error in deleteAReview:", error);
      throw new AppError("Something went wrong", 400);
    }
  });
