import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    phoneNumber: { type: String, required: true},
    checkoutRequestId: { type: String, required: true },
    merchantRequestId: { type: String, required: true },
    mpesaReceiptNumber: { type: String },
    rawCallback: { type: Object},
},
{timestamps: true})

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;