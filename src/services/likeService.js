import { getPostById } from "./postService.js";
import { createPostLike, findLikePost} from "../repositories/postLikeRepository.js";
import { findPostById, updatePostLike } from "../repositories/postRepository.js";
import { createCommentLike, findCommentLike } from "../repositories/commentLikeRepository.js";
import { updateCommentLike , getCommentById} from "../repositories/commentRepository.js"
export const createPostLikeService = async(likeObject)=>{
    try{
        const user_id = likeObject.user_id;
        const post_id = likeObject.post_id;
        const post = await getPostById(post_id);
        if(!post){
            throw{
                status: 404,
                message : "post not found"
            }
        }
        const likeExist = await findLikePost(user_id, post_id);
        console.log(likeExist, "likeExist");
        if(likeExist){
            throw{
                status : 500,
                message : "like already exists"
            }
        }
        const newLike = await createPostLike(user_id, post_id);
        const response = await updatePostLike(post_id);
        return response;
    }catch(error){
        throw error;
    }
}

export const createCommentLikeService = async(likeObject)=>{
    try{
        const user_id = likeObject.user_id;
        const comment_id = likeObject.comment_id;
        const comment = await getCommentById(comment_id);
        if(!comment){
            throw{
                status : 404,
                message : "comment not found"
            }
        }
        const likeExist = await findCommentLike(user_id, comment_id);
        if(likeExist){
            throw{
                status: 500,
                message : "like already exists"
            }
        }
        const like = await createCommentLike(user_id, comment_id);
        const updatedComment = await updateCommentLike(comment_id);
        return updatedComment;
    }catch(error){
        throw error;
    }
}

export const countLikeOnPostService = async(post_id)=>{
    try{
        const post = await findPostById(post_id);
        if(!post){
            throw{
                status : 404,
                message : "post not found"
            }
        }
        console.log(post);
        const count = post.count_likes;
        return count;
    }catch(error){
        throw error;
    }
}

export const isPostLikedByUserService = async(details)=>{
    try{
        const post_id = details.post_id;
        const user_id = details.user_id;
        const post = await getPostById(post_id);
        if(!post){
            throw{
                status : 404,
                message : "post not found"
            }
        }
        const response = await findLikePost(user_id, post_id);
        return response;
    }catch(error){
        throw{
            status : 500,
            message : "internal server error"
        }
    }
}

export const isCommentLikedByUserService = async(comment, user)=>{
    try{
        const commentElement = getCommentById(comment);
        if(!commentElement){
            throw{
                status : 404,
                message : "comment not found"
            }
        }
        const response = await findCommentLike(user, comment);
        return response;
    }catch(error){
        throw{
            status : 500,
            message : "internal server error"
        }
    }
}