import Product from "../models/Products.js";
import fs from "fs";
import path from "path";

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const {
      name,
      category,
      description,
      short_description,
      brand,
      tags,
      variants,
      status,
    } = req.body;

    // Parse JSON fields
    const parsedCategory = category ? JSON.parse(category) : product.category;
    const parsedVariants = variants ? JSON.parse(variants) : product.variants;
    const parsedTags = tags ? JSON.parse(tags) : product.tags;

    // Image replacement
    if (req.file && product.image) {
      const oldImagePath = path.join("public", product.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    product.name = name ?? product.name;
    product.category = parsedCategory;
    product.description = description ?? product.description;
    product.short_description = short_description ?? product.short_description;
    product.brand = brand ?? product.brand;
    product.tags = parsedTags;
    product.variants = parsedVariants;
    product.status = status ?? product.status;

    if (req.file) {
      product.image = req.file
        ? req.file.path
            .split("public")[1]
            .replace(/\\/g, "/")
        : null;
    }

    await product.save();

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};

/**
 * DELETE PRODUCT (entirely)
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete image from filesystem
    if (product.image) {
      const imagePath = path.join("public", product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(id);

    // Orders keep snapshot → nothing else to do
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

/**
 * CREATE PRODUCT
 */
export const createProduct = async (req, res) => {
  try {
    const {
      productCode,
      sku,
      name,
      description,
      short_description,
      brand,
      variants,
      status,
    } = req.body;

    const category = JSON.parse(req.body.category);
    const tags = req.body.tags
        ? JSON.parse(req.body.tags)
        : [];


    // Basic validation
    if (!productCode || !sku || !name || !variants) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Prevent duplicates
    const exists = await Product.findOne({
      $or: [{ productCode }, { sku }],
    });

    if (exists) {
      return res
        .status(409)
        .json({ message: "Product with same code or SKU already exists" });
    }

    const product = new Product({
      productCode,
      sku,
      name,
      category,
      description,
      short_description,
      brand,
      tags,
      variants: typeof variants === "string" ? JSON.parse(variants) : variants,
      status,
      image: req.file
        ? req.file.path
            .split("public")[1]
            .replace(/\\/g, "/")
        : null,
    });

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create product" });
  }
};

