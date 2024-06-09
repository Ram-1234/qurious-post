import express from "express";
import {User} from "../model/models.js";

const register = async(req, res)=>{
    let data = req.body;
    try {
        let res = await User.create(data);
            res.status(200).json({message:"user created successfully"});
    } catch (error) {
        console.log(error)
    }
}

const login = async(req, res)=>{
    let {email} = req.body;

    try {
        let res = await User.findUnique({"email":email});
            res.status(200).json({message:"user found"});
    } catch (error) {
        console.log(error)
    }
}

const logout = async(req, res)=>{
    let {email} = req.body;

    try {
        let res = await User.delete({"email":email});
            res.status(200).json({message:"user logout"});
    } catch (error) {
        console.log(error)
    }
}

export {register, login, logout}