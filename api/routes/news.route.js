import express from 'express';
import { fetchNews } from "../controller/news.controller.js";


const router = express.Router()

router.get("/technews", fetchNews);

export default router;