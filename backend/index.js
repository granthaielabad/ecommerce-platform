import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./src/utils/utils.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import {
  errorHandler,
  notFoundErrorHandler,
} from "./src/middlewares/errorHandler.js";
import userRouter from "./src/routes/userRoutes.js";
import vendorRouter from "./src/routes/vendorRoutes.js";
import productRouter from "./src/routes/productRoutes.js";
import brandRouter from "./src/routes/brandRoutes.js";
import categoryRouter from "./src/routes/categoryRoutes.js";
import subCategoryRouter from "./src/routes/subCategoryRoutes.js";
import reviewRouter from "./src/routes/reviewRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Connection to mongodb
dbConnect();

// Initalize express
const app = express();

// Middleware setup
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Serve static files from the 'frontend' directory
app.use(express.static("frontend"));

// API routes
app.use("/api/user", userRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/products", productRouter);
app.use("/api/brand", brandRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/review", reviewRouter);

// Error handling middlewares
app.use(notFoundErrorHandler);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
