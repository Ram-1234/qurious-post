import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register=async(req,res)=>{
const {email, username,password} = req.body;
try {
//  HASH THE PASSWORD
let hashedPassword = await bcrypt.hash(password, 10);
//CREATE A NEW USER AND SAVE TO DB
const newUser = await prisma.user.create({
    data:{
        username,
        email,
        password:hashedPassword
    }
});
res.status(200).json({message:"User created Successfully!"})
} catch (error) {
    console.warn(error)
    res.status(500).json({message:"failed to create user!"})
}
}

export const login=async(req,res)=>{
//db operation
const {email, username,password} = req.body;
try {
// check if the user exist
const user = await prisma.user.findUnique({
    where:{username}
})
if(!user) return res.status(401).json({message:"Invalid username!"})
// check if the password is correct
const isPasswordValid = await bcrypt.compare(password,user.password);

if(!isPasswordValid) return res.status(401).json({message:"Invalid password!"});

// GENERATE COOKIE TOKEN AND SEND TO THE USER
const age = 1000*60*60*24*1;
const token = jwt.sign({
    id:user.id,
    isAdmin:false
},process.env.JWT_SECRET_KEY,{expiresIn:age});
res.cookie("session_token", token,{
    httpOnly:true,
    age:age
}).status(200).json({message:"Login success!", user:{email:user.email,username:username}})
//  HASH THE PASSWORD
} catch (error) {
    res.status(500).json({message:"Failed to login!"})
}
}
export const logout=(req,res)=>{
//db operation
console.log('res', res);
res.clearCookie('session_token').status(200).json({message:"Logout successful!"});
}