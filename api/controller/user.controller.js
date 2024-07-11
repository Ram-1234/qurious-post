import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const Users = await prisma.user.findMany();
    res.status(200).json({ Users });
  } catch (error) {
    res.status(500).send({ message: "failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    //console.log("res user", user);
    res.status(200).json(user);
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ message: "failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const body = req.body;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(401).json({ message: "Not Authorized!" });
  }
  let updatedPassword = null;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Athorized" });
  }
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to update user!" });
  }
  return;
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  if (id !== tokenUserId) {
    return res.status(402).json({ message: "Not Authorized" });
  }
  try {
    const deletedUser = await prisma.user.delete({ where: { id } });
    res.status(200).send(deletedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to delete user!" });
  }
};
