import express from "express";
import Blog from "../models/blog.js";
import { uploadBlogImage } from "../middleware/uploadBlogImage.js";
import {adminAuth} from "../middleware/adminAuth.js"; 
import fs from "fs";
import path from "path";

const router = express.Router();

/**
 * CREATE BLOG (Admin)
 */
router.post(
  "/",
  adminAuth,
  uploadBlogImage.single("image"),
  async (req, res) => {
    try {
      const { title, authorName, content } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      const blog = await Blog.create({
        title,
        authorName,
        content,
        image: req.file
          ? req.file.path
              .replace(/\\/g, "/")
              .replace(/^\/+/, "")
          : null,
      });

      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * GET ALL BLOGS (Public)
 */
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET SINGLE BLOG
 */
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * DELETE BLOG (Admin)
 */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Resolve image path
    const imagePath = path.join(
      process.cwd(),
      blog.image.replace("/", "")
    );

    // Delete image if it exists
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete blog document
    await blog.deleteOne();

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
