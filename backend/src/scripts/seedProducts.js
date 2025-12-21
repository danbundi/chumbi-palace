import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/Products.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    // ✅ Correct path resolution
    const filePath = path.join(__dirname, "../data/products.json");

    if (!fs.existsSync(filePath)) {
      throw new Error(`products.json not found at ${filePath}`);
    }

    const rawData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(rawData);

    const formattedProducts = products.map((p) => ({
      productCode: p.id,
      sku: p.sku,
      name: p.name,
      image: p.image,
      category: p.category,
      description: p.description,
      short_description: p.short_description,
      brand: p.brand,
      tags: p.tags,
      variants: p.variants,
      status: p.status || "active",
    }));

    await Product.deleteMany();
    await Product.insertMany(formattedProducts);

    console.log("Products seeded successfully 🌱");
    process.exit();
  } catch (error) {
    console.error("Seeding failed ❌", error.message);
    process.exit(1);
  }
};

seedProducts();
