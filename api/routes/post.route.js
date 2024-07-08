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

router.get("/posts", getPosts);

router.get("/random_posts",getRandomPostsForUsers);

router.get("/posts/:id", userPosts);

router.get("/:id", getPost);

router.post("/create", createPost);

router.put("/:id", updatePost);

router.delete("/:id",verifyToken, deletePost);

export default router;
