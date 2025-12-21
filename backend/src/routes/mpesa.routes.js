import express from "express";
import { stkPush, getPaymentStatus } from "../controllers/mpesa.controller.js";

const router = express.Router();

router.post("/stk-push", stkPush);
router.get("/status/:checkoutRequestID", getPaymentStatus);


// M-Pesa Callback Endpoint
router.post("/callback", async (req, res) => {
  try {
    console.log("📩 MPESA CALLBACK RECEIVED");
    console.log(JSON.stringify(req.body, null, 2));

    const stkCallback = req.body.Body?.stkCallback;

    if (!stkCallback) {
      return res.json({ ResultCode: 0, ResultDesc: "No callback data" });
    }

    const {
      ResultCode,
      ResultDesc,
      CheckoutRequestID,
      CallbackMetadata,
    } = stkCallback;

    if (ResultCode === 0) {
      const items = CallbackMetadata.Item;

      const amount = items.find(i => i.Name === "Amount")?.Value;
      const mpesaReceipt = items.find(i => i.Name === "MpesaReceiptNumber")?.Value;
      const phone = items.find(i => i.Name === "PhoneNumber")?.Value;

      // ✅ UPDATE TRANSACTION
      await Transaction.findOneAndUpdate(
        { checkoutRequestId: CheckoutRequestID },
        {
          status: "paid",
          amount,
          mpesaReceipt,
          phoneNumber: phone,
          resultDesc: ResultDesc,
        }
      );

      console.log("✅ PAYMENT SAVED");
    } else {
      await Transaction.findOneAndUpdate(
        { checkoutRequestId: CheckoutRequestID },
        {
          status: "failed",
          resultDesc: ResultDesc,
        }
      );

      console.log("❌ PAYMENT FAILED:", ResultDesc);
    }

    res.json({ ResultCode: 0, ResultDesc: "Callback processed successfully" });

  } catch (error) {
    console.error("🔥 CALLBACK ERROR:", error.message);

    res.json({ ResultCode: 0, ResultDesc: "Callback error handled" });
  }
});


export default router;