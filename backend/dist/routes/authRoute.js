"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
var express_1 = __importDefault(require("express"));
var authController_1 = require("../controllers/authController");
var commonAuth_1 = require("../middleware/commonAuth");
var router = express_1.default.Router();
exports.authRoute = router;
/* ------------------- Signup / Login --------------------- */
router.post("/signup", authController_1.UserSignUp);
router.post("/login", authController_1.UserLogin);
/* ------------------- Authentication --------------------- */
router.use(commonAuth_1.Authenticate);
/* ------------------- Verify / Otp --------------------- */
// router.post("/verify", UserVerify);
// router.post("/otp", RequestOtp);
/* ------------------- Profile --------------------- */
router.get("/profile", authController_1.GetUserProfile);
//# sourceMappingURL=authRoute.js.map