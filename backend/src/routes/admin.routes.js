import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import Product from "../models/Products.js";
import Order from "../models/order.js";
import Transaction from "../models/transaction.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { uploadProductImage } from "../middleware/uploadProductImage.js";
import { updateProduct, deleteProduct, createProduct } from "../controllers/adminProduct.controller.js";

const router = express.Router();

/**
 * CHECK IF ADMIN EXISTS
 */
router.get("/exists", async (req, res) => {
  const adminCount = await Admin.countDocuments();
  res.json({ exists: adminCount > 0 });
});

/**
 * REGISTER ADMIN (ONLY ONCE)
 */
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingAdmin = await Admin.findOne();
  if (existingAdmin) {
    return res.status(403).json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    username,
    password: hashedPassword,
  });

  res.json({ message: "Admin created successfully" });
});

/**
 * LOGIN ADMIN
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { adminId: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token,
  });
});

// Get all products (for admin dashboard)
router.get("/products", adminAuth, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get all orders (for admin dashboard)
router.get("/orders", adminAuth, async (req, res) =>{
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
})

// get all transactions
router.get("/transactions", adminAuth, async (req, res) =>{
  const transactions = await Transaction.find().sort({ createdAt: -1 });
  res.json(transactions);
})

// Edit product (whole product, variants included)
router.put(
  "/products/:id",
  adminAuth,
  uploadProductImage.single("image"),
  updateProduct
);

// Delete product
router.delete(
  "/products/:id",
  adminAuth,
  deleteProduct
);

// CREATE product
router.post(
  "/products",
  adminAuth,
  uploadProductImage.single("image"),
  createProduct
);

export default router;
