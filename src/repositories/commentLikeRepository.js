import commentLike from "../schema/commentLike.js";
export const createCommentLike = async(user_id, comment_id)=>{
    try{
        const like = await commentLike.create({user_id, comment_id});
        return like
    }catch(error){
        console.log(error);
    }
}
export const findCommentLike = async(user_id, comment_id)=>{
    try{
        const count = await commentLike.countDocuments({user_id, comment_id});
        return count;
    }catch(error){
        console.log(error);
    }
}

export const deleteCommentLikeOfUser = async(user_id)=>{
    try{
        const response = await commentLike.deleteMany({user_id});
        return response;
    }catch(error){
        throw error;
    }
}