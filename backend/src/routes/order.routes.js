import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    const orderItems = items.map(item => {
      const subtotal = item.variant.price * item.quantity;
      totalAmount += subtotal;

      return {
        productId: item.productId, // JSON ID
        productName: item.productName,
        category: item.category,
        image: item.image,

        variant: {
          name: item.variant.name,
          weight: item.variant.weight,
          sku: item.variant.sku,
          price: item.variant.price,
        },

        quantity: item.quantity,
        subtotal,
      };
    });

    const order = await Order.create({
      items: orderItems,
      totalAmount,
      status: "pending",
      paymentMethod: "mpesa",
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("ORDER CREATE ERROR:", error.message);
    res.status(500).json({ message: "Failed to create order" });
  }
});

export default router;
