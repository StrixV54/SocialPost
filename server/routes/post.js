import express from "express";
import {getPosts,createPosts} from "../controllers/post.js";

const router=express.Router();

router.get('/',(req,res)=>getPosts);
router.post('/',(req,res)=>createPosts);

export default router;