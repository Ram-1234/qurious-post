import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";


export const register = async (req, res) => {
  const { password, ...rest } = req.body;
  
  try {
    let hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        password: hashedPassword,
        ...rest,
      },
    });
    res.status(200).json({ message: "User created Successfully!" });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { email, username, password } = req.body;
  
  try {
    // check if the user exist
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) return res.status(401).json({ message: "Invalid username!" });
    // check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password!" });
    // GENERATE COOKIE TOKEN AND SEND TO THE USER
    const age = 1000 * 60 * 60 * 5;
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age },
    );
    res
      .cookie("session_token", token, {
        httpOnly: true,
        age: age,
      })
      .status(200)
      .json({
        message: "Login success!",
        user: { email: user.email, username: username, id: user.id },
      });
    //  HASH THE PASSWORD
  } catch (error) {
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  //db operation
  res
    .clearCookie("session_token")
    .status(200)
    .json({ message: "Logout successful!" });
};
