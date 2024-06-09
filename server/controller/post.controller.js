import { Post } from "../model/models.js";

const createPost = async(req,res)=>{
    const data = req.body;
    console.log('data', data);
    try {
        const resp = await Post.create(data);
        console.log('resp', resp)
        res.status(200).json({message:"post created"});
    } catch (error) {
        console.log(error);
    }
}

const updatePost = async(req,res)=>{
    const data = req.body;
    try {
        const resp = await Post.update(data);
        res.status(200).json({message:"post updated"});
    } catch (error) {
        console.log(error);
    }
}

const findPost = async(req,res)=>{
    const {id} = req.body;
    try {
        const resp = await Post.findUnique(id);
        res.status(200).json({resp});
    } catch (error) {
        console.log(error);
    }
}

export {createPost, updatePost, findPost}