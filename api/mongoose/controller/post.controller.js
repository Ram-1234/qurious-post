import Post from "../models/post.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  const { start, end } = req.body;
  try {
    const posts = await Post.find()
      .skip(start || 0)
      .limit(end || 20)
      .populate("authorId") // replaces the per-post findUnique loop
      .lean();

    // keep the same response shape as before: { ...item, user: {...} }
    const updatedPost = posts.map((item) => {
      const { authorId, ...rest } = item;
      return { ...rest, authorId: authorId?._id, user: authorId };
    });

    res.status(200).json({ posts: updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "401 Error" });
  }
};

export const userPosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const listofPost = await Post.find({ authorId: userId })
      .populate("authorId") // matches `include: { author: true }`
      .lean();

    // rename authorId -> author to match your Prisma `include` shape
    const data = listofPost.map((item) => {
      const { authorId, ...rest } = item;
      return { ...rest, author: authorId };
    });

    res.status(200).json({ message: "data fetched successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to fetch posts" });
  }
};

export const createPost = async (req, res) => {
  const data = req.body;
  try {
    const resp = await Post.create(data);
    res.status(200).json({ message: "Post Created Successfully", data: resp });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "404 Something went wrong" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id).lean();
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "401 Error" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  try {
    await Post.findByIdAndUpdate(id, inputs, { new: true });
    res.status(200).json({ message: "Post Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "401 Error" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "post deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to delete post!" });
  }
};

/**** different users random post */
export const getRandomPostsForUsers = async (req, res) => {
  try {
    const randomPosts = await Post.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$authorId",
          posts: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          posts: { $slice: ["$posts", 2] }, // top 2 per author
        },
      },
      { $unwind: "$posts" },
      { $replaceRoot: { newRoot: "$posts" } },
      {
        $lookup: {
          from: "users", // MongoDB collection name (lowercase, pluralized)
          localField: "authorId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ]);

    res.status(200).json({ posts: randomPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to fetch random posts" });
  }
};