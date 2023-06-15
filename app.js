import  express  from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";

const app=express();
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);
app.use("/api",(req,res,next)=>{
res.send("Hello world");
});
mongoose.connect('mongodb+srv://hs8449865663:harshit@cluster0.walmubl.mongodb.net/?retryWrites=true&w=majority').then(()=>app.listen(3000)).then(()=>console.log("Connected to database with host 3000")).catch((err)=>console.log(err));


