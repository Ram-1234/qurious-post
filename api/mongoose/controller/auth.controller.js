import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  const { password, ...rest } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      password: hashedPassword,
      ...rest,
    });
    res.status(200).json({ message: "User created Successfully!" });
  } catch (error) {
    console.warn(error);

    // Mongo's duplicate key error (unique email/username violation)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({ message: `${field} already in use!` });
    }

    res.status(500).json({ message: "failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // check if the user exists
    const user = await User.findOne({ username });

    if (!user) return res.status(401).json({ message: "Invalid username!" });

    // check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password!" });

    // generate cookie token and send to the user
    const age = 1000 * 60 * 60 * 5;
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();

    res
      .cookie("session_token", token, {
        httpOnly: true,
        maxAge: age, // was "age" — not a valid cookie option, this was a silent bug
      })
      .status(200)
      .json({
        message: "Login success!",
        user: userWithoutPassword,
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("session_token")
    .status(200)
    .json({ message: "Logout successful!" });
};