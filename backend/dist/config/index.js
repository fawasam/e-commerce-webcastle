"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.APP_SECRET = exports.MONGO_URI = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + "/.env" });
exports.MONGO_URI = process.env.MONGO_URI;
exports.APP_SECRET = process.env.APP_SECRET;
exports.PORT = process.env.PORT || 3000;
//# sourceMappingURL=index.js.map