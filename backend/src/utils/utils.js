import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/**
 * Generate a JSON Web Token (JWT) for authentication
 * @param {string} id - The user ID to include in the token payload
 * @returns {string} - Signed JWT
 */
export const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

/**
 * Establish a connection to the MongoDB database
 */
export const dbConnect = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the application if the database connection fails
  }
};
