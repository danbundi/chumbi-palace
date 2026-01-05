import multer from "multer";
import path from "path";
import fs from "fs";

const baseDir = "public";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category
      ? JSON.parse(req.body.category)[0]
      : "misc";

    const folderMap = {
      seedsandnuts: "seedsandnuts",
      spices: "spices",
      teasanddetox: "teasanddetox",
    };

    const folder = folderMap[category] || "misc";
    const uploadPath = path.join(baseDir, folder);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `product-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only images allowed"), false);
};

export const uploadProductImage = multer({
  storage,
  fileFilter,
});
