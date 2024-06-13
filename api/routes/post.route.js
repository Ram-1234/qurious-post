import express from "express";
import {
  getPosts,
  getPost,
  updatePost,
  createPost,
  deletePost,
  listofPost,
} from "../controller/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/posts", getPosts);

router.get("/posts/:id", userPosts);

router.get("/:id", getPost);

router.post("/create", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
