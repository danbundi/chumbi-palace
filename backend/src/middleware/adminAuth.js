import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId);

    if (!admin) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.admin = admin; // Attach admin to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};
