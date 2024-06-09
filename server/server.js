import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import authRouter from "./route/auth.routes.js";
import postRoute from "./route/post.route.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", authRouter);
app.use("/api",postRoute);

const mongodb_url = 'mongodb+srv://ramnayan699:Ram123@cluster0.g2awwpj.mongodb.net/real-state?retryWrites=true&w=majority&appName=Cluster0'; // Change as per your MongoDB URL
mongoose.connect(mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
});


app.listen(5040, ()=>{
    console.log('server running on 5040')
})