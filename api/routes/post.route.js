import express from "express";
import {
  getPosts,
  getPost,
  updatePost,
  createPost,
  deletePost,
} from "../controller/post.controller";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/create", createPost);

router.put("/:id", updatePost);

router.delete("/:id", createPost);

export default router;
