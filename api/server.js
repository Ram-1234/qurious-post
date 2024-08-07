import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import userAuth from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import newsRoute from "./routes/news.route.js";
import dotenv from "dotenv";
dotenv.config()


const PORT = process.env.PORT || 8000

const app = express();
app.use(cors({ origin: process.env.DATA_CLIENT_URL, credentials: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.DATA_CLIENT_URL);
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/post", postRoute);
app.use("/api/auth", userAuth);
app.use("/api/users", userRoute);
app.use("/api/test", testRoute);
app.use("/api/news", newsRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});
