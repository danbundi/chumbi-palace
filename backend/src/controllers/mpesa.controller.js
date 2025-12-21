import axios from "axios";
import dayjs from "dayjs";
import { getMpesaToken } from "../config/mpesa.js";

export const getPaymentStatus = async (req, res) => {
  const { checkoutRequestID } = req.params;
  checkoutRequestID.trim()
  console.log(checkoutRequestID)

  if (!checkoutRequestID) {
    return res.status(400).json({ error: "CheckoutRequestID is required" });
  }

  const timestamp = dayjs().format("YYYYMMDDHHmmss");

  const password = Buffer.from(
    `174379${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString("base64");

  const payload = {
    BusinessShortCode: 174379,
    Password: password,
    Timestamp: timestamp,
    CheckoutRequestID: checkoutRequestID
  };

  try {
    const accessToken = await getMpesaToken();

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
      payload,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return res.json(response.data);
  } catch (err) {
    console.error("Payment status error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to get payment status" });
  }
};


export const stkPush = async (req, res) => {
  try {
    const { phoneNumber, amount } = req.body;

    console.log("STK PUSH BODY:", { phoneNumber, amount });

    const accessToken = await getMpesaToken();
    console.log("ACCESS TOKEN:", accessToken);

    const timestamp = dayjs().format("YYYYMMDDHHmmss");

    const password = Buffer.from(
      `174379${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const payload = {
      BusinessShortCode: 174379,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: 174379,
      PhoneNumber: phoneNumber,
      CallBackURL: "https://example.com/mpesa-callback", // TEMP
      AccountReference: "TestOrder",
      TransactionDesc: "Test STK Push",
    };

    console.log("STK PAYLOAD:", payload);

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("SAFARICOM RESPONSE:", response.data);

    return res.status(200).json({
      success: true,
      checkoutRequestID: response.data.CheckoutRequestID,
      merchantRequestID: response.data.MerchantRequestID,
      customerMessage: response.data.CustomerMessage,
      raw: response.data,
    });

  } catch (error) {
    console.error(
      "STK PUSH ERROR:",
      error.response?.data || error.message
    );

    return res.status(400).json({
      success: false,
      error: "STK Push failed",
      details: error.response?.data || error.message,
    });
  }
};
