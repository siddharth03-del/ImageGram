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

// export const getCommentLike = async(user_id, comment_id)=>{
//     try{
//         const like = await commentLike.({user_id, comment_id});
//         console.log(like, "getCommentLike");
//         return like;
//     }catch(error){
//         console.log(error);
//     }
// }