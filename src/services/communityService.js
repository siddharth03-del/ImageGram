import { findUserById } from "../repositories/userRepository.js"
import { followUser, unFollowUser } from "../repositories/communityRepository.js";
import { updateProfileFollowersAdd, updateProfileFollowersDelete, updateProfileFollowingAdd, updateProfileFollowingDelete } from "../repositories/profileRepository.js";
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
        await updateProfileFollowersAdd(follow);
        await updateProfileFollowingAdd(user);
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
        await updateProfileFollowersDelete(unfollow);
        await updateProfileFollowingDelete(user);
        return response;
    }catch(error){
        throw error;
    }
}
