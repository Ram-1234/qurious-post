import express from "express";
import { getUsers,getUser,updateUser,deleteUser } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { upload } from "../controller/image_file.controller.js";

const router = express.Router();
router.get("/",getUsers);
router.get("/:id",verifyToken,getUser);
router.put("/:id",verifyToken,upload.single("avatar"),updateUser);
router.delete("/:id",verifyToken,deleteUser);
export default router;