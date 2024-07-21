"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var commonAuth_1 = require("../middleware/commonAuth");
var checkFileType_1 = require("../utility/checkFileType");
var router = express_1.default.Router();
exports.productRoute = router;
var _a = require("../controllers"), GetProducts = _a.GetProducts, GetProductById = _a.GetProductById, CreateProduct = _a.CreateProduct, UpdateProduct = _a.UpdateProduct, DeleteProduct = _a.DeleteProduct;
var imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/images");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname);
    },
});
var images = (0, multer_1.default)({
    storage: imageStorage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        (0, checkFileType_1.checkFileType)(file, cb);
    },
}).array("images", 10);
router.get("/", GetProducts);
router.get("/:id", GetProductById);
router.use(commonAuth_1.Authenticate);
router.post("/", images, CreateProduct);
router.put("/:id", images, UpdateProduct);
router.delete("/:id", DeleteProduct);
//# sourceMappingURL=productRoute.js.map