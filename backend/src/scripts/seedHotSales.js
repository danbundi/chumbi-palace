import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import HotSale from "../models/HotSale.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedHotSales = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    const filePath = path.join(__dirname, "../data/hotsale.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const hotSales = JSON.parse(rawData);

    const formatted = hotSales.map((item) => ({
      hotSaleCode: item.id,
      productCode: item.product_id,
      name: item.product_name,
      description: item.description,
      weight: item.weight,
      salePrice: item.sale_price,
      regularPrice: item.regular_price,
      promoTag: item.promo_tag,
      validUntil: item.valid_until,
      status: "active",
    }));

    for (const hs of formatted) {
      await HotSale.updateOne(
        { hotSaleCode: hs.hotSaleCode },
        { $set: hs },
        { upsert: true }
      );
    }

    console.log("🔥 Hot sales seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Hot sale seeding failed", error);
    process.exit(1);
  }
};

seedHotSales();
