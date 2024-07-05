import { Router } from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  filterProduct,
  getAllProducts,
  getImageById,
  getProductById,
  getProductsList,  
  getTotal,  
  searchProducts,  
  updateProduct,
} from "../controllers/productController.js";
import formidableMiddleware from "express-formidable";

const router = Router();

// Create product route
router.post("/create-product", requireSignin, isAdmin, formidableMiddleware(), createProduct);

// Update product route
router.put("/update-product/:id", requireSignin, isAdmin, formidableMiddleware(), updateProduct);

// Get all products route
router.get("/", getAllProducts);

// Get product by Id route
router.get("/single/:id", getProductById)

// Get Image by product id
router.get("/image/:id", getImageById)

// Delete product route
router.delete("/delete/:id", deleteProduct)

router.post("/filter", filterProduct)

router.get("/total", getTotal)

router.get("/products-list/:page", getProductsList)

router.get("/search/:keyword", searchProducts)

export default router;
