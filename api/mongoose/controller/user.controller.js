import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const Users = await User.find().lean();
    res.status(200).json({ Users });
  } catch (error) {
    res.status(500).send({ message: "failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).lean();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(401).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;

  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
      { new: true } // returns the updated document, like Prisma's update does
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to update user!" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(402).json({ message: "Not Authorized" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).send(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to delete user!" });
  }
};