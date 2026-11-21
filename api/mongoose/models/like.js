import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  like: { type: Boolean },
});

export default mongoose.model("Like", likeSchema);