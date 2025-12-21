import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  // Snapshot (never changes even if product changes)
  name: String,
  image: String,

  variant: {
    name: String,
    weight: String,
    price: Number,
    sku: String,
  },

  quantity: {
    type: Number,
    required: true,
  },

  subtotal: {
    type: Number,
    required: true,
  },
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
