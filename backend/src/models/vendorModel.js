import mongoose from "mongoose";
import slugify from "slugify";

const vendorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeName: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    storeDescription: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Automatically generate a slug from the store name
vendorSchema.pre("save", async function (next) {
  this.slug = slugify(this.storeName.toLowerCase());
  next();
});

export const Vendor = mongoose.model("Vendor", vendorSchema);
