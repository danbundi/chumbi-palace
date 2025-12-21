import express from "express";
import { getAllHotSales } from "../controllers/hotsale.controller.js";

const router = express.Router();

// GET /api/hotsales
router.get("/", getAllHotSales);

export default router;
