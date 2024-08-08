import { Router } from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import {
  braintreePayment,
  createProduct,
  deleteProduct,
  filterProduct,
  generateBraintreeToken,
  getAllProducts,
  getImageById,
  getProductByCategory,
  getProductById,
  getProductsList,  
  getRelatedProducts,  
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

router.get("/single/:id", getProductById)

router.get("/image/:id", getImageById)

router.delete("/delete/:id", deleteProduct)

router.post("/filter", filterProduct)

router.get("/total", getTotal)

router.get("/products-list/:page", getProductsList)

router.get("/search/:keyword", searchProducts)

router.get("/related-products/:cid", getRelatedProducts)

router.get("/:cid", getProductByCategory)

router.get("/braintree/token", generateBraintreeToken)

router.post("/braintree/payment", requireSignin, braintreePayment)

export default router;
