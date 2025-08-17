import express from "express";
import { getAllUsers, loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/profile/update", isAuthenticated, singleUpload, updateProfile);
router.get("/all-users", getAllUsers);
export default router;