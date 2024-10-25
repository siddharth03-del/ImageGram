import { createPostLikeService, createCommentLikeService } from "../services/likeService.js";
export const createPostLike = async(req, res) => {
    try{
        const user_id = req.user._id;
        const post_id = req.body.post_id;
        const reponse = await createPostLikeService({user_id, post_id});
        res.status(201).json({
            success : true,
            message: 'Post liked successfully',
            data: reponse
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : error
        })
    }
}

export const createCommentLike = async(req, res)=>{
    try{
        const user_id = req.user._id;
        const comment_id = req.body.comment_id;
        const response = await createCommentLikeService({user_id,comment_id});
        res.status(201).json({
            success : true,
            message: 'Comment liked successfully',
            data : response
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : error
        })
    }
}