import express from "express";
import { createProduct, deleteProduct, getAllProducts,getProduct, hideProduct } from "../controllers/product.js";



const router = express.Router();

router.get("/products/",getAllProducts);
router.get("/products.json",getAllProducts);

router.get("/products/:gtin",getProduct);

router.get("/products/hide/:gtin",hideProduct);
router.delete("/products/delete/:gtin",deleteProduct);



router.post("/products/new",createProduct);







export default router;