import { changeAccountPassword, deleteUser, findUserByUsername, userSignUp } from "../repositories/userRepository.js";
import { findUserByEmailId, findUserById, findAllUsersByPrefix } from "../repositories/userRepository.js";
import { createUserCommunity , deleteCommunityOfUser, getUserCommunityByUserId} from "../repositories/communityRepository.js";
import bcrypt from 'bcrypt';
import { generateJWT, verifyJWT } from "../utils/jwt.js";
import { deletePostsOfUser, getPostFromFollowingArray , getPostsOtherThanUserId} from "../repositories/postRepository.js";
import { createProfileService } from "./profileService.js";
import { deleteProfileOfUser, getImageAndNameByUserId } from "../repositories/profileRepository.js";
import mongoose from "mongoose";
import { deleteCommentLikeOfUser } from "../repositories/commentLikeRepository.js";
import { deleteCommentsOfUser } from "../repositories/commentRepository.js";
import { deletePostOfUserFromCloud } from "./postService.js";
import { deletePostLikeOfUser } from "../repositories/postLikeRepository.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendOTP} from "../utils/sendmail.js";
import { verifyOTP } from "../utils/verifyOTP.js";
import { generateJWTPasswordChange } from "../utils/changepasswordjwt.js";
export const signUpUser = async (details) => {
    try{
        const emailExists = await findUserByEmailId(details.email);
        if(emailExists){
            throw {
                status : 400,
                message : "Use different email address"
            }
        }
        const usernameExists = await findUserByUsername(details.username);
        if(usernameExists){
            throw {
                status : 400,
                message : "Username already exists"
            }
        }
        const response = await userSignUp(details);
        if(!response){
            throw{
                status : 500,
                message : 'Internal Server Error'
            }
        }
        createUserCommunity(response._id);
        createProfileService(response._id);
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}
export const signInUser = async (details) =>{
    try{
        const user = await findUserByEmailId(details.email);
        if(!user){
            throw{
                status : 400,
                message : "User not found"
            }
        }
        console.log(user, "userfrom user service");
        const isValid = bcrypt.compareSync(details.password, user.password);
        console.log(isValid);
        if(isValid){
            const token = generateJWT({email : user.email, _id : user._id, username : user.username});
            return token;
        }
        else{
            throw {
                status : 400,
                message : "Invalid password"
            }
        }
    }catch(error){
        if(error.status == 400){
            throw error;
        }
        throw {
            status : 500,
            message : "unexpected error occured"
        }
    }
}

export const userByEmail = async (emailId) =>{
    try{
        const user = await findUserByEmailId(emailId);
        return user;
    }catch(error){
        console.log(error);
    }
}

export const doesUserExist = async (details) => {
    try{
        const _id = details._id;
        const user = await findUserById(_id);
        return user;
    }catch(error){
        console.log(error);
    }
}

export const getAllUsersService = async (prefix, page, limit) => {
    try {
        const users = await findAllUsersByPrefix(prefix, page, limit);
        const result = [];
        
        // Use Promise.all to await all asynchronous operations within the forEach
        await Promise.all(users.map(async (e) => {
            const response = await getImageAndNameByUserId(e._id);
            const obj = new Object();
            obj._id = e._id;
            obj.username = e.username;
            try{
                const image = response.image;
                const name = response.name;
                if(image){
                    obj.image = image;
                }
                if(name){
                    obj.name = name;
                }
            }catch(error){
                console.log(error);
            }
            result.push(obj);
        }));
        
        return result;
    } catch (error) {
        throw error;
    }
};


export const getFeedForUserService = async(userId)=>{
    try{
        const userCommunity = await getUserCommunityByUserId(userId);
        console.log(userCommunity);
        const following = userCommunity.following;
        const feed = await getPostFromFollowingArray(following);
        return feed;
    }catch(error){
        throw error;
    }
}

export const getAllPostFeedForUserService = async(userId, page, limit)=>{
    try{
        const posts = await getPostsOtherThanUserId(userId, page, limit);
        return posts;
    }catch(error){
        throw error;
    }
}

export const verifyTokenService = async(token)=>{
    try{
        const user = verifyJWT(token);
        if(!user){
            return {valid : false};
        }
        const response = await doesUserExist(user);
        if(response){
            return {valid : true};
        }
        return {valid : false};
    }catch(error){
        console.log(error);
        if(error.name === "TokenExpiredError"){
            return {
                valid : false
            };
        }
        else{
            throw{
                status : 500, 
                message : "Internal Server Error"
            }
        }
    }
}

export const deleteUserService = async(userId)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const commentLikedeleted = await deleteCommentLikeOfUser(userId);
        const commentsDeleted = await deleteCommentsOfUser(userId);
        const communityDeleted = await deleteCommunityOfUser(userId);
        await deletePostOfUserFromCloud(userId);
        const postsDeleted = await deletePostsOfUser(userId);
        const PostLikeDeleted = await deletePostLikeOfUser(userId);
        const commentLikeDeleted = await deleteCommentLikeOfUser(userId);
        const profileDeleted = await deleteProfileOfUser(userId);
        const userDeleted = await deleteUser(userId);
        await session.commitTransaction();
        await session.endSession();
        return { 
            success : true,
            message : "User deleted successfully"
        };
    }catch(error){
        await session.abortTransaction();
        throw error;
    }
}

export const sendOTPService = (email)=>{
    try{
        const otp = generateOTP(email);
        sendOTP(email, otp);
        return {
            success : true,
            message : "OTP sent successfully",
            sent : true
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const verifyOTPService = (email, otp)=>{
    try{
        const response = verifyOTP(email, otp);
        if(response){
            const token = generateJWTPasswordChange({email});
            console.log(token);
            return {
                valid : true,
                message : "OTP is verified",
                token : token
            }
        }
        else{
            return {
                valid : false,
                message : "OTP is not verified"
            }
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const changeAccountPasswordService = async(email, password)=>{
    try{
        const response = changeAccountPassword(email, password);
        return response
    }catch(error){
        console.log(error);
        throw error;
    }
}