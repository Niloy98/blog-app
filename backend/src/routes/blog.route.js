import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import { createBlog, deleteBlog, dislikeBlog, getAllBlogs, getMyTotalBlogLikes, getOwnBlogs, getPublishedBlog, likeBlog, togglePublishBlog, updateBlog } from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/", isAuthenticated, createBlog);
router.put("/:blogId", isAuthenticated, singleUpload, updateBlog);
router.get("/get-own-blogs", isAuthenticated, getOwnBlogs);
router.delete("/delete/:id", isAuthenticated, deleteBlog);
router.get("/:id/like", isAuthenticated, likeBlog);
router.get("/:id/dislike", isAuthenticated, dislikeBlog);
router.get('/my-blogs/likes', isAuthenticated, getMyTotalBlogLikes);
router.get("/get-published-blogs", getPublishedBlog);
router.patch("/:blogId", togglePublishBlog);
router.get("/get-all-blogs", getAllBlogs);

export default router;