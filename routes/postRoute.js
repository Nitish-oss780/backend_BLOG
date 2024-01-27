import express from "express"
import { createPost,deletePost,getAllPost,getOnePost,getPhoto,test, updatePost } from "../controllers/postController.js";
import formidable from "express-formidable";
const route=express.Router();

route.get("/getall",getAllPost);
route.get("/getone/:id",getOnePost);
route.get("/getphoto/:id",getPhoto);
route.post("/post",formidable(),createPost);
route.put("/update/:id",formidable(),updatePost);
route.delete('/delete/:id', deletePost);

route.get("/test",test);

export default route;