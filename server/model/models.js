import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const postSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title:{type:String, required:true},
    theme:{type:String},
    story:{type:String, required:true}
})

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

export {User, Post}