import express from "express";

let router = express.Router();

router.get("/",(req,res)=>{
    res.send("user list");
})

router.get("/new", (req,res)=>{
    res.send("new user");
})

router.post("/", (req,res)=>{
    res.send("user created");
})

router.route("/:id")
.get((req,res)=>{
    res.send(`get user id ${req.params.id}`);
})
.put((req,res)=>{
    res.send(`updated user id ${req.params.id}`);
})
.delete((req,res)=>{
    res.send(`delete user id ${req.params.id}`);
})

let users=[{name:"Kyle"},{name:"Sally"}]
router.param("id",(req,res,next,id)=>{
    req.user = users[id];
    console.log(`id is ${id}`)
    next();
})

export default router