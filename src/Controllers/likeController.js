import { createPostLikeService, createCommentLikeService, countLikeOnPostService, isPostLikedByUserService , isCommentLikedByUserService} from "../services/likeService.js";
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

export const countLikeOnPost = async(req, res)=>{
    try{
        const post = req.query.post;
        const response = await countLikeOnPostService(post);
        res.status(200).json({
            success : true,
            message: response
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const isPostLikedByUser = async(req, res)=>{
    try{
        const post_id = req.query.post;
        const user_id = req.user._id;
        const response = await isPostLikedByUserService({post_id, user_id});
        res.status(200).json({
            success : true,
            message : response
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const isCommentLikedByUser = async(req, res)=>{
    try{
        const comment_id = req.query.comment;
        const user = req.user._id;
        const response = await isCommentLikedByUserService(comment_id, user);
        res.status(200).json({
            success : true,
            data : response
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}