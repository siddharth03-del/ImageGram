import postLike from "../schema/postLikes.js";
export const createPostLike = async(user_id, post_id)=>{
    try{
        const response = await postLike.create({user_id, post_id});
        return response;
    }catch(error){
        throw {
            status : 500,
            message : "Internal server error"
        }
    }
}
export const findLikePost = async(user_id, post_id)=>{
    try{
        const response = await postLike.countDocuments({user_id , post_id});
        console.log(response, "findLike");
        return response;
    }catch(error){
        throw {
            status : 500,
            message : "Internal server error"
        }
    }
}

export const deletePostLikeOfUser = async(user_id)=>{
    try{
        const response = await postLike.deleteMany({user_id});
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}