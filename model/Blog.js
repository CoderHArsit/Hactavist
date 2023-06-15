import mongoose from "mongoose";

const Schema=mongoose.Schema;

const blogSchema=new Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        require:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    },
});

export default mongoose.model("Blog",blogSchema);
