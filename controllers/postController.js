import postModel from "../models/postModel.js";
import fs from "fs"
export const createPost=async(req,res)=>{
     try {
           const {title,description,content,author}=req.fields;
           const {photo}=req.files;
           switch(true)
           {
            case !title: return res.status(500).send({error:"title is required"})
            case !description: return res.status(500).send({error:"description is required"})
            case !content: return res.status(500).send({error:"content is required"})
            case !author: return res.status(500).send({error:"author is required"})
            case !photo || photo.size>1000000: return res.status(500).send({error:"photo is required and less than 1mb"})
           }
           
           const post=new postModel(req.fields);
           if(photo){
            post.photo.data=fs.readFileSync(photo.path);
            post.photo.contentType=photo.type;
           }

           await post.save();
           res.status(201).send({
            success:true,
            message:"Post Created SuccessFully",
            post,
           })
            
     } catch (error) {
        console.log(error);
         res.status(500).send({
            success:false,
            error,
            message:"Error in Creating Post"
         })
     }
}



// Controller function to delete a post by ID
export const deletePost = async (req, res) => {
   
 
    try {
        const postId = req.params.id;
        console.log(postId);
      const deletedPost = await postModel.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json({ success:true,
         message: 'Post deleted successfully', deletedPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



  export const updatePost=async(req,res)=>{
    try {
          const {title,description,content,author}=req.fields;
          const {photo}=req.files;
          switch(true)
          {
           case !title: return res.status(500).send({error:"title is required"})
           case !description: return res.status(500).send({error:"description is required"})
           case !content: return res.status(500).send({error:"content is required"})
           case !author: return res.status(500).send({error:"author is required"})
           case !photo || photo.size>1000000: return res.status(500).send({error:"photo is required and less than 1mb"})
          }
          
          const post=await postModel.findByIdAndUpdate(req.params.id,req.fields,{new:true});


          if(photo){
           post.photo.data=fs.readFileSync(photo.path);
           post.photo.contentType=photo.type;
          }

          await post.save();

          await post.save();
          res.status(201).send({
           success:true,
           message:"Post Updated SuccessFully",
           post,
          })
           
    } catch (error) {
       console.log(error);
        res.status(500).send({
           success:false,
           error,
           message:"Error in Updating post"
        })
    }
}
  

export const getAllPost=async(req,res)=>{
    try {
      const post=await postModel.find({}).select("-photo").sort({createdAt:-1});
      res.status(200).send({
          success:true,
          counTotal:post.length,
          message:"All Products",
          post,
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({
          success:false,
          error,
          message:"Error in getting all Product"
      })
    }
}

export const getOnePost=async(req,res)=>{
    try {
           
      const post=await postModel.findOne({_id:req.params.id}).select("-photo");
      res.status(200).send({
          success:true,
          counTotal:post.length,
          message:"one Products",
          post,
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({
          success:false,
          error,
          message:"Error in getting one Product"
      })
    }
}


export const getPhoto=async(req,res)=>{
      try {
          const post= await postModel.findById(req.params.id).select("photo");
          if(post.photo.data)
          res.set('Content-type',post.photo.contentType);
          return res.status(200).send(post.photo.data);
      } catch (error) {
          console.log(error);
          res.status(500).send({
            success:false,
            error,
            message:"Error in Geting Photo",
          })
      }
}



export const test=async(req,res)=>{
        try {
            console.log("heloo");
            res.json("route is working");
        } catch (error) {
            console.log(error);
        }
        
    
}