import {createPost, updatePost, findPost} from "../controller/post.controller.js";
import express from "express";

const router = express.Router();

router.post("/create_post", createPost);
router.post("/update_post", updatePost);
router.post("/find_post", findPost);

export default router;