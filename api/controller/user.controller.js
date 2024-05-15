import prisma from "../lib/prisma.js";

export const getUsers=async(req,res)=>{
    try {
        const Users = await prisma.user.findMany();
        res.status(200).json({Users});
        
    } catch (error) {
        res.status(500).send({message:"failed to get users!"});
    }
}

export const getUser=async(req,res)=>{
    const id = req.params.id;
    console.log('id', id);

    try {
        const user = await prisma.user.findUnique({where:{id}});
        console.log('user', user);
        res.status(200).json(user)
    } catch (error) {
        console.log('err', error)
        //res.status(500).json({message:"failed to get user!"});
    }
    
}

export const updateUser=async(req,res)=>{
    const id = req.params.id;
    const tokenUserId = req.userId;
    const body = req.body;

    if(id!==tokenUserId){
        return res.status(403).json({message:"Not Athorized"})
    }
    try {
        const updatedUser = await prisma.user.update({where:{id},data:body})
        console.log('updateUser',updatedUser)
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to update user!"});
    }
    return
}

export const deleteUser=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to delete user!"});
    }
}