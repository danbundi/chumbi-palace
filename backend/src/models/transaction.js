import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    phoneNumber: String,
    amount: Number,

    checkoutRequestId: String,
    merchantRequestID: String,

    mpesaReceipt: String,

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    resultDesc: String,
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
