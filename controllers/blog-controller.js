import Blog from "../model/Blog";

export const getAllBlogs=async(req,res,next)=>{
    let blogs;
    try{
           blogs=await Blog.find();
    }catch(err){
        return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message:"NO Blogs found"})
    }
    return res.status(200).json({blogs})
};

export const addBlogs=async (req, res, next)=>{
    const {title, description, image , user}= req.body;
    let existingUser;
    try{
        existingUser=await User.findById(user);
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message:"Unable to find user by this Id"});
    }
    
    const blog =new Blog({
        title,
        description,
        image,
        user,
    });
    try{
      const session= await mongoose.startSession();
      session.startTransaction();
      await blog.save({session});
      existingUser.blogs.push(blog);
      await existingUser.save({session});
      await session.commitTransaction();
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err});
    }
    return res.status(200).json({blog})
};

export const updateBlog=async(req,res,next)=>{
    const {title, description}=req.body;
    const blogId=req.params.id;
     let blog;
    try{ blog=await Blog.findByIdAndUpdate(blogId,{
        title,
        description,
    })}catch(err){
        return res.status(500).json({message:"Unable to update the blog"})
    }
    return res.status(200).json({blog});


};
export const getById =async(req, res, next)=>{
    const id= req.params.id;
   let blog;
   try{
    blog= await Blog.findById(id);
   }catch(err){
    return console.log(err);
   }
   if(!blog){
    return res.status(200).json({message:"No Blog Found"});

   }
   return res.status(200).json({blog});
};

export const deleteBlogs = async (req,res,next)=>{
    const id=req.params.id;


    let blog;
    try{
        blog=await Blog.findByIdAndRemove(id)
    }catch(err){
        console.log(err);
    }
    if(!blog){
        return res.status(400).json({message:"Unable to delete"});
    }
    return res.status(200).json({message:"Successfully deleted"});
}