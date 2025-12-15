import express from "express";
import { stkPush } from "../controllers/mpesa.controller.js";

const router = express.Router();

router.post("/stk-push", stkPush);

export default router;