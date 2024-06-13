
import express from 'express';
import { deleteUser, getAllUser, getSingleUser, getUserDetails, loginUser, logout, registerUser, updateUserRole } from '../controllers/user.js';
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();

router.post("/register", singleUpload, registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/me", isAuthenticatedUser, getUserDetails);



// admin routes 
router
    .route("/admin/users")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router
    .route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)
export default router;