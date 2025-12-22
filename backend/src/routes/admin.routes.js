import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import Product from "../models/Products.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

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

export default router;
