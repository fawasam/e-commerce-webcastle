import express from "express";
import multer from "multer";
import { Authenticate } from "../middleware/commonAuth";
import { checkFileType } from "../utility/checkFileType";
const router = express.Router();
const {
  GetProducts,
  GetProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controllers");

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname
    );
  },
});

const images = multer({
  storage: imageStorage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("images", 10);

router.get("/", GetProducts);
router.get("/:id", GetProductById);

router.use(Authenticate);
router.post("/", images, CreateProduct);
router.put("/:id", images, UpdateProduct);
router.delete("/:id", DeleteProduct);

export { router as productRoute };
