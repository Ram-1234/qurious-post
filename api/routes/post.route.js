import express from "express";
import {
  getPosts,
  getPost,
  updatePost,
  createPost,
  deletePost,
  userPosts,
  getRandomPostsForUsers,
} from "../controller/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get("/posts", verifyToken, getPosts);
router.get("/random_posts",verifyToken,getRandomPostsForUsers);
router.get("/posts/:id",verifyToken, userPosts);
router.get("/:id",verifyToken, getPost);
router.post("/create",verifyToken, createPost);
router.put("/:id",verifyToken, updatePost);
router.delete("/:id",verifyToken, deletePost);

export default router;
