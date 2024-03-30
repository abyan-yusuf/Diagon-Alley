import { Router } from "express";
import {
  registerUser,
  loginUser,
  allUsers,
  forgotPassword,
  getSecurityQuestion,
} from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/get-sec-ques", getSecurityQuestion);
router.get("/users", requireSignin, isAdmin, allUsers);
router.get("/user-auth", requireSignin, (req, res) =>
  res.status(200).send({ ok: true })
);

export default router;
