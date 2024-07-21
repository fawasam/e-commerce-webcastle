import express from "express";
import {
  UserSignUp,
  UserLogin,
  GetUserProfile,
} from "../controllers/authController";
import { Authenticate } from "../middleware/commonAuth";
const router = express.Router();

/* ------------------- Signup / Login --------------------- */
router.post("/signup", UserSignUp);
router.post("/login", UserLogin);

/* ------------------- Authentication --------------------- */
router.use(Authenticate);

/* ------------------- Verify / Otp --------------------- */
// router.post("/verify", UserVerify);
// router.post("/otp", RequestOtp);

/* ------------------- Profile --------------------- */
router.get("/profile", GetUserProfile);

export { router as authRoute };
