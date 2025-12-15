import axios from "axios";
import Transaction from "../models/transaction.js";
import { getMpesaToken } from "../config/mpesa.js";
import { generatePassword } from "../utils/generatePassword.js";

const stkPush = async (req, res) => {
    try {
        const { phoneNumber, amount } = req.body;

        if (!phoneNumber || !amount) {
            return res.status(400).json({ message: "Phone and amount required!"});
        };

        const token = await getMpesaToken();
        const { password, timestamp } = generatePassword();

        const response = await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
            BusinessShortCode: process.env.MPESA_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: phoneNumber,
            PartyB: process.env.MPESA_SHORTCODE,
            PhoneNumber: phoneNumber,
            CallBackURL: process.env.MPESA_CALLBACK_URL,
            AccountReference: "OrderPayment",
            TransactionDesc: "E-commerce payment",
        },
    {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    // Save transaction to DB
    await Transaction.create({
        phoneNumber,
        amount,
        checkoutRequestId: response.data.CheckoutRequestID,
        merchantRequestID: response.data.MerchantRequestID,
        status: "pending",
    });

    res.json({
        message: "STK push sent",
        response: response.data,
    });

    } catch (error) {
        console.log("STK Push Error:", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to initiate STK Push manze"});
    };
};

export { stkPush }
