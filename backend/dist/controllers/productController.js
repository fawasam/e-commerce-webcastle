"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProduct = exports.UpdateProduct = exports.CreateProduct = exports.GetProductById = exports.GetProducts = void 0;
var Product_1 = __importDefault(require("../models/Product"));
var User_1 = __importDefault(require("../models/User"));
var asyncErrorHandler_1 = require("../utility/asyncErrorHandler");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
/**
    @desc   Get all products
    @route  GET  /api/product
    @access Public
*/
exports.GetProducts = (0, asyncErrorHandler_1.asyncErrorHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Product_1.default.find()];
            case 1:
                products = _a.sent();
                res.status(200).json(products);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).json({ message: "Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
    @desc   Get single product
    @route  GET  /api/product/:id
    @access Public
*/
exports.GetProductById = (0, asyncErrorHandler_1.asyncErrorHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_1.default.findById(req.params.id)];
            case 1:
                product = _a.sent();
                res.json(product);
                return [2 /*return*/];
        }
    });
}); });
/**
    @desc   Create new product
    @route  POST  /api/product
    @access Private
*/
exports.CreateProduct = (0, asyncErrorHandler_1.asyncErrorHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, name, description, category, price, subtitle, size, seller, files, images, product;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = req.user;
                _a = req.body, name = _a.name, description = _a.description, category = _a.category, price = _a.price, subtitle = _a.subtitle, size = _a.size;
                if (!name || !description || !category || !price || !subtitle || !size) {
                    return [2 /*return*/, res.status(400).json({ message: "Please fill all fields" })];
                }
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: "User not found" })];
                }
                if (!(user.role === "admin")) return [3 /*break*/, 4];
                return [4 /*yield*/, User_1.default.findById(user._id)];
            case 1:
                seller = _b.sent();
                if (!(seller !== null)) return [3 /*break*/, 3];
                files = req.files;
                images = files.map(function (file) { return file.filename; });
                if (!images) {
                    return [2 /*return*/, res.status(400).json({ message: "Images not found" })];
                }
                product = new Product_1.default({
                    name: name,
                    description: description,
                    category: category,
                    price: price,
                    subtitle: subtitle,
                    seller: seller._id,
                    images: images,
                    size: size,
                });
                return [4 /*yield*/, product.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json(product)];
            case 3: return [3 /*break*/, 5];
            case 4: return [2 /*return*/, res.status(400).json({ message: "Not Authorized" })];
            case 5: return [2 /*return*/, res.status(400).json({ message: "Unable to create product" })];
        }
    });
}); });
/**
    @desc   Update a product
    @route  PUT  /api/product
    @access Private
*/
exports.UpdateProduct = (0, asyncErrorHandler_1.asyncErrorHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, seller, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                if (!user) return [3 /*break*/, 5];
                return [4 /*yield*/, User_1.default.findById(user._id)];
            case 1:
                seller = _a.sent();
                if (!!seller) return [3 /*break*/, 2];
                return [2 /*return*/, res.status(400).json({ message: "User not found" })];
            case 2: return [4 /*yield*/, Product_1.default.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                })];
            case 3:
                product = _a.sent();
                res.status(200).json(product);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5: return [2 /*return*/, res.status(400).json({ message: "Unable to Update product " })];
            case 6: return [2 /*return*/];
        }
    });
}); });
/**
    @desc   Delete a product
    @route  DELETE  /api/product/:id
    @access Private
*/
exports.DeleteProduct = (0, asyncErrorHandler_1.asyncErrorHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, imagePaths;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_1.default.findById(req.params.id)];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(400).json({ message: "Product not found" })];
                }
                imagePaths = product.images;
                imagePaths.forEach(function (imagePath) {
                    fs_1.default.unlink(path_1.default.resolve(__dirname, "..", "images", imagePath), function (err) {
                        if (err) {
                            // Log error or handle it as per your application's needs
                            console.error("Failed to delete image at ".concat(imagePath, ": ").concat(err));
                        }
                    });
                });
                return [4 /*yield*/, Product_1.default.findByIdAndDelete(req.params.id)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Product deleted Successfully" })];
        }
    });
}); });
//# sourceMappingURL=productController.js.map