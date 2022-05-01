import PostMessage from "../models/postMessage.js";

const getPosts = async (req,res)=>{
     try{
          const postMessages = await PostMessage.find();
          res.status(200).json(postMessages);
     } catch(err){
          res.status(404).json({message:err.message});
     }
};

const createPosts = async (req,res)=>{
     const post=res.body;
     const newPost = new PostMessage(post);
     try{
          await newPost.save();
          res.status(201).json(newPost);
     }catch(err){
          res.status(409).json({message:err.message});
     }
};

export {getPosts,createPosts};