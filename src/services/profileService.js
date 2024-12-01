import { getUserCommunityByUserId } from "../repositories/communityRepository.js";
import { findAllPosts, getNumberOfPostsByUserId } from "../repositories/postRepository.js";
import { createProfile, getProfile } from "../repositories/profileRepository.js";
import { updateProfile } from "../repositories/profileRepository.js";
import { v2 as cloudinary } from 'cloudinary';
import { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "../Config/server_config.js";
import { findUserById, findUserByUsername, getUsername } from "../repositories/userRepository.js";
cloudinary.config({
    cloud_name : CLOUD_NAME,
    api_key : CLOUDINARY_API_KEY,
    api_secret : CLOUDINARY_API_SECRET,
    secure : true
});
export const updateProfileService = async(updateObject, user)=>{
    try{
        const community = await getUserCommunityByUserId(user);
        updateObject.followers = community.followers.length;
        updateObject.following = community.following.length;
        updateObject.posts = await getNumberOfPostsByUserId(user);
        const response = await updateProfile(user, updateObject);
        return response
    }catch(error){
        throw error;
    }
}

export const createProfileService = async(user)=>{
    try{
        const response = await createProfile(user);
        return response;
    }catch(error){
        throw error;
    }
}

export const getProfileService = async(user)=>{
    try{
        const response = await getProfile(user);
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
        throw {
            status : 500,
            message : "Internal server error"
        }
    }
}

export const deleteProfilePictureFromCloudService = async(public_id)=>{
    try{
        console.log("called deleteProfilePictureFromCloudService")
        await cloudinary.uploader.destroy(public_id, (result)=>{console.log(result)});
        console.log("profile pic deleted from cloud service");
        return {response : "ok"};
    }catch(error){
        console.log("error deleting profile picture from cloud service")
        return {response : "error"};
    }
}

export const getExploreProfileService = async(username)=>{
    try{
        const user = await findUserByUsername(username);
        if(!user){
            return {
                status : 404,
                message : "User not found"
            }
        }
        const profile = await getProfile(user._id);
        const posts = await findAllPosts(0, 100, user._id);
        const obj = JSON.parse(JSON.stringify(profile));
        obj.allposts = posts;
        return obj;
    }catch(error){
        console.log(error);
        return {
            status : 500,
            message : "Internal server error"
        }
    }
}