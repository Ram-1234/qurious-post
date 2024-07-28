import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";


export const getPosts = async (req, res) => {
  const { start, end } = req.body;
  try {
    const posts = await prisma.post.findMany({
      skip: start || 0,
      take: end || 20,
    });
   
    const list = posts.map(async (item) => {
      return {
        ...item,
        user: await prisma.user.findUnique({ where: { id: item.authorId } }),
      };
    });

    const updatedPost = await Promise.all(list);
    
    res.status(200).json({ posts: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "401 Error" });
  }
};

export const userPosts = async (req, res) => {
  const userId = req.params.id;
  try {
    let listofPost = await prisma.post.findMany({
      where: { authorId: userId },
      include: { author: true },
    });
    
    res
      .status(200)
      .json({ message: "data fetched successfully", data: listofPost });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (req, res) => {
  //const id = req.params.id;
  //const tokenUserId = req.userId;
  const data = req.body;
  try {
    const resp = await prisma.post.create({ data });
    res.status(200).json({ message: "Post Created Successfully", data: resp });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "404 Something went wrong" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  // const tokenUserId = req.userId;
  // const body = req.body;
  // const { password, avatar, ...inputs } = req.body;

  // if (id !== tokenUserId) {
  //   return res.status(401).json({ message: "Not Authorized!" });
  // }

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

  // if (id !== tokenUserId) {
  //   return res.status(401).json({ message: "Not Authorized!" });
  // }

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
  
  // if (id !== tokenUserId) {
  //   return res.status(402).json({ message: "Not Authorized" });
  // }
 
  try {
    const deletedPost = await prisma.post.delete({ where: { id } });
    res.status(200).json({ message: "post deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to delete post!" });
  }
};

/**** different users random post */
export const getRandomPostsForUsers = async (req, res) => {
  
  try {
    const randomPosts = [];
    const randomUsers = await prisma.user.findMany();
  

    for (let user of randomUsers) {
      const userPosts = await prisma.post.findMany({
        where: {
          authorId: user.id,
        },
        orderBy: {
          createdAt: "desc", // or any other order that fits your logic
        },
        take: 2,
      });
      randomPosts.push(...userPosts);
    }

    // add authorId
    const list = randomPosts.map(async (item) => {
      return {
        ...item,
        user: await prisma.user.findUnique({ where: { id: item.authorId } }),
      };
    });

    const updatedPost = await Promise.all(list);
   
    res.status(200).json({ posts: updatedPost });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
