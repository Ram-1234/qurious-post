import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    story: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    theme: { type: String },
  },
  { timestamps: true } // adds createdAt + updatedAt automatically
);

export default mongoose.model("Post", postSchema);