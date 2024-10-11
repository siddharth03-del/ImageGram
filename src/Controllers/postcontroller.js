import { createPostService } from "../services/postService.js";
export async function createPost(req, res){
    console.log(req.file);
    const post = await createPostService({
        caption: req.body.caption,
        image: req.file.path
    });
    
    return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post
    });

}