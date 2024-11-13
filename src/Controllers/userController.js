import { signUpUser , signInUser, getAllUsersService, getAllPostFeedForUserService } from "../services/userService.js";
import { getFeedForUserService } from "../services/userService.js";
export async function signUp(req, res){
    try{
        const details = req.body;
        const reponse = await signUpUser(details);
        return res.status(201).json({
            success : "true",
            user : reponse
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message : "Error"
        })
    }
}
export async function signIn(req, res){
    try{
        const details = req.body;
        const response = await signInUser(details);
        return res.status(201).json({
            success : true,
            user : response
        })
    }catch(error){
        return res.status(500).json({
            message : error
        })
    }
}

export async function getAllUsers(req, res){
    try{
        const details = req.body;
        const users = await getAllUsersService(details.prefix);
        return res.status(200).json({
            success : true,
            data : {
                users : users
            }
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            error : error
        })
    }
}

export async function getFeedForUser(req, res){
    try{
        const user = req.user._id;
        const posts = await getFeedForUserService(user);
        return res.status(200).json({
            success : true,
            data : posts
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export async function getAllPostFeedForUser(req, res){
    try{
        const user = req.user._id;
        console.log(user);
        const posts = await getAllPostFeedForUserService(user);
        return res.status(200).json({
            success : true,
            data : posts
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}