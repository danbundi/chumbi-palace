import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  productName: String,
  category: String,
  image: String,

  // 🔹 VARIANT SNAPSHOT
  variant: {
    name: String,      // Small Pack
    weight: String,    // 0.25 kg
    sku: String,       // CHIA-SM
    price: Number,
  },

  quantity: Number,
  subtotal: Number,
});

const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["mpesa"],
      default: "mpesa",
    },

    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
