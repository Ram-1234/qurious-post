import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import userAuth from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(cors({ origin: process.env.DATA_CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const prisma = new PrismaClient();

// async function main(){
//     await prisma.user.deleteMany();
// }

// main()
// .catch(e=>{
//     console.log(e.message)
// }).finally(async()=>{
//     await prisma.$disconnect();
// })

app.use("/api/post", postRoute);
app.use("/api/auth", userAuth);
app.use("/api/users", userRoute);
app.use("/api/test", testRoute);

app.listen(8000);
