import express from 'express';
import router from './src/routes/mpesa.routes.js';
import orderRouter from './src/routes/order.routes.js';
import productRoutes from './src/routes/product.routes.js';
import hotsaleRoutes from './src/routes/hotsale.routes.js';
import cors from 'cors';
import connectDB from './src/config/db.js';

await connectDB();

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.static("public"));
app.use("/api/products", productRoutes);
app.use("/api/hotsales", hotsaleRoutes);

import { getMpesaToken } from "./src/config/mpesa.js";

app.use(express.json());


app.use("/api/mpesa", router);

app.use("/api/orders", orderRouter);

app.get("/test-token", async (req, res) => {
  const token = await getMpesaToken();
  res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Server up baby 😎. Port is ${PORT}`)
})