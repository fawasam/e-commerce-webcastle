"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileType = checkFileType;
var path_1 = __importDefault(require("path"));
function checkFileType(file, cb) {
    var filetypes = /jpeg|jpg|png|webp/;
    var extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    var mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb("Error: Images only! (jpeg, jpg, png, gif)");
    }
}
//# sourceMappingURL=checkFileType.js.map