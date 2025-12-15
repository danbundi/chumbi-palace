import express from 'express';
import router from './src/routes/mpesa.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

import { getMpesaToken } from "./src/config/mpesa.js";

app.use(express.json());


app.use("/api/mpesa", router);

app.get("/test-token", async (req, res) => {
  const token = await getMpesaToken();
  res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Server up baby 😎. Port is ${PORT}`)
})