import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  _id: { type: String }, // name acts as the primary key, same as your Prisma model
});

export default mongoose.model("Tag", tagSchema);