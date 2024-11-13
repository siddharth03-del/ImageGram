import { findUserById } from "../repositories/userRepository.js"
import { followUser, unFollowUser } from "../repositories/communityRepository.js";
export const followUserService = async(user, follow)=>{
    try{
        const userToFollow = await findUserById(follow);
        if(!userToFollow){
            throw {
                status : 404,
                message : "To follow user not found"
            }
        }
        const response = await followUser(user, follow);
        return response;
    }catch(error){
        throw error;
    }
}

export const unFollowUserService = async(user, unfollow)=>{
    try{
        const userToUnfollow = await findUserById(unfollow);
        if(!userToUnfollow){
            throw {
                status : 404,
                message : "To unfollow user not found"
            }
        }
        const response = await unFollowUser(user, unfollow);
        return response;
    }catch(error){
        throw error;
    }
}