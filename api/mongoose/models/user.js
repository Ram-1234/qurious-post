import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    about: { type: String },
    jobrole: { type: String },
    role: { type: String, enum: ["BASIC", "ADMIN"], default: "BASIC" },
  },
  { timestamps: { createdAt: "createAt", updatedAt: false } } // matches your Prisma field name
);

export default mongoose.model("users", userSchema);