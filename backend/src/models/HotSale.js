import mongoose from "mongoose";

const hotSaleSchema = new mongoose.Schema(
  {
    hotSaleCode: {
      type: String,
      required: true,
      unique: true, // hs_001
    },

    productCode: {
      type: String, // prod_001 (informational only)
    },

    name: {
      type: String,
      required: true,
    },

    description: String,

    weight: String,

    salePrice: {
      type: Number,
      required: true,
    },

    regularPrice: Number,

    promoTag: {
      type: String,
      default: "HOT SALE",
    },

    image: String,

    validUntil: Date,

    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("HotSale", hotSaleSchema);
