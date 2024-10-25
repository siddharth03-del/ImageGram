import { getPostById } from "./postService.js";
import { createPostLike, findLike} from "../repositories/postLikeRepository.js";
import { updatePostLike } from "../repositories/postRepository.js";
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
        const likeExist = await findLike(user_id, post_id);
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