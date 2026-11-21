import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  message: { type: String },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

export default mongoose.model("Comment", commentSchema);