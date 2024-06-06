import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "401 Error" });
  }
};

export const createPost = async (req, res) => {
  //const id = req.params.id;
  //const tokenUserId = req.userId;
  const data = req.body;
  console.log('body', data)


  try {
    const res = await prisma.post.create({data});
    console.log('res', res);
    res.status(200).json({ message: "Post Created Successfully" });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: "404 Something went wrong" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const body = req.body;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(401).json({ message: "Not Authorized!" });
  }

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "401 Error" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const body = req.body;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(401).json({ message: "Not Authorized!" });
  }

  try {
    const post = await prisma.post.update({
      where: { id },
      data: body,
    });
    res.status(200).json({ message: "Post Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "401 Error" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  if (id !== tokenUserId) {
    return res.status(402).json({ message: "Not Authorized" });
  }
  try {
    const deletedPost = await prisma.post.delete({ where: { id } });
    res.status(200).json({ message: "post deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to delete post!" });
  }
};
