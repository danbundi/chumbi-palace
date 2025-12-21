import Product from "../models/Products.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "active" }).sort({
      createdAt: -1,
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};
