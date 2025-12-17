import axios from "axios";
import Transaction from "../models/transaction.js";
import { getMpesaToken } from "../config/mpesa.js";
import { generatePassword } from "../utils/generatePassword.js";

const stkPush = async (req, res) => {
  try {
    let { phoneNumber, amount } = req.body;

    if (!phoneNumber || !amount) {
      return res.status(400).json({ message: "Phone and amount required!" });
    }

    const formattedPhone = phoneNumber.startsWith("254")
      ? phoneNumber
      : phoneNumber.replace(/^0/, "254");

    const token = await getMpesaToken();
    console.log("ACCESS TOKEN:", token);
    const { password, timestamp } = generatePassword();

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: `${process.env.MPESA_CALLBACK_URL}/api/mpesa/callback`,
        AccountReference: "OrderPayment",
        TransactionDesc: "E-commerce payment",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    );

    await Transaction.create({
      phoneNumber: formattedPhone,
      amount,
      checkoutRequestId: response.data.CheckoutRequestID,
      merchantRequestId: response.data.MerchantRequestID,
      status: "pending",
    });
    
    res.json({
      message: "STK push sent",
      response: response.data,
    });
  } catch (error) {
    console.log("STK Push Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to initiate STK Push" });
  }
};

export { stkPush };