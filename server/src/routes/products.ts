import express from "express";
import { createProduct, createProductReview, deleteProduct, deleteReview, getAdminProducts, getAllCategories, getAllProducts, getProductDetails, getProductReviews } from "../controllers/product.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
import { multipleUpload } from "../middleware/multer.js";


const router = express.Router();

router.route("/allProducts").get(getAllProducts);
router.route("/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews/:id").get(getProductReviews)
router.route("/reviews/:id/:reviewId").delete(isAuthenticatedUser, deleteReview);
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router.route("/all/categories").get(getAllCategories);
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), multipleUpload, createProduct);

router
    .route("/admin/product/:id")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
// .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)





export default router;