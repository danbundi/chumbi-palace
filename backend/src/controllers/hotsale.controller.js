import HotSale from "../models/HotSale.js";

// GET all active hot sales
export const getAllHotSales = async (req, res) => {
  try {
    const hotSales = await HotSale.find({ status: "active" }).sort({
      createdAt: -1,
    });
    res.status(200).json(hotSales);
  } catch (error) {
    console.error("GET HOTSALES ERROR:", error);
    res.status(500).json({ message: "Failed to fetch hot sales" });
  }
};
