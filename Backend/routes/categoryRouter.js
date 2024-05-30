import { Router } from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import { createCategory, getCategory, updateCategory } from "../controllers/categoryController.js";

const router = Router()

router.post("/create-category", requireSignin, isAdmin, createCategory)

router.put("/update-category/:id", requireSignin, isAdmin, updateCategory)

router.get("/categories", getCategory)

export default router