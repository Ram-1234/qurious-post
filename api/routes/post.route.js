import express from "express";
import {
  getPosts,
  getPost,
  updatePost,
  createPost,
  deletePost,
} from "../controller/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/create", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
