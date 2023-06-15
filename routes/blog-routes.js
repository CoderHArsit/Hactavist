import express from 'express'
import { addBlogs, deleteBlogs, getAllBlogs, getById, updateBlog } from '../controllers/blog-controller';
const blogRouter=express.Router();


blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlogs);
blogRouter.put("/update",updateBlog);
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",deleteBlogs);
export default blogRouter;