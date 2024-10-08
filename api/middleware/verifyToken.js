import jwt from 'jsonwebtoken';

export const verifyToken=async(req,res, next)=>{
    const token = req.cookies.session_token;
    
    
    if(!token) return res.status(401).json({message:"Session expired!"});
    
    jwt.verify(token, process.env.JWT_SECRET_KEY,async(err,payload)=>{
        if(err) return res.status(403).json({message:"Token is not valid!"})
        req.userId = payload.id;
        next();
    })
    //res.status(200).json({message:"You are Authenticated"});
}