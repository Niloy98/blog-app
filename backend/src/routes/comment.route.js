import express from "express"

import { createComment, deleteComment, editComment, getAllCommentsOnMyBlogs, getCommentsOfPost, likeComment } from "../controllers/comment.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router()

router.post('/:id/create', isAuthenticated, createComment);
router.delete("/:id/delete", isAuthenticated, deleteComment);
router.put("/:id/edit", isAuthenticated, editComment);
router.get("/:id/comment/all", getCommentsOfPost);
router.get('/:id/like', isAuthenticated, likeComment);
router.get('/your-blog/comments', isAuthenticated, getAllCommentsOnMyBlogs)


export default router;