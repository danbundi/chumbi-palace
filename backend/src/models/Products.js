import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },   // Small Pack
    weight: { type: String, required: true }, // 0.25 kg
    price: { type: Number, required: true },
    sku: { type: String, required: true },    // CHIA-SM
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    // 🔹 Your custom product ID (NOT MongoDB ID)
    productCode: {
      type: String,
      required: true,
      unique: true, // prod_001
    },

    sku: {
      type: String,
      required: true,
      unique: true, // CHIA-001
    },

    name: {
      type: String,
      required: true,
    },

    image: String,

    category: {
      type: [String], // ["Seeds and Nuts"]
      default: [],
    },

    description: String,
    short_description: String,

    brand: String,

    tags: {
      type: [String],
      default: [],
    },

    variants: {
      type: [variantSchema],
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
