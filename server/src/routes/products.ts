import express from "express";
import { createProduct, createProductReview, deleteReview, getAdminProducts, getAllProducts, getProductDetails, getProductReviews } from "../controllers/product.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
import { multipleUpload } from "../middleware/multer.js";


const router = express.Router();

router.route("/allProducts").get(getAllProducts);
router.route("/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews/:id").get(getProductReviews)
router.route("/reviews/:id/:reviewId").delete(isAuthenticatedUser, deleteReview);
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
// router.route("/AllCategories").get(getAllCategories);
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), multipleUpload, createProduct);

// router
//     .route("/admin/product/:id")
//     .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
//     .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);





export default router;