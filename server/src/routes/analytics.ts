import express from "express";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
import { getAnalyticsData } from "../controllers/analytics.js";

const router = express.Router();
router.route("/admin/analytics").get(isAuthenticatedUser, authorizeRoles("admin"), getAnalyticsData);

export default router;