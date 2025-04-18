import { signUpUser , signInUser, getAllUsersService, getAllPostFeedForUserService } from "../services/userService.js";
import { getFeedForUserService, verifyTokenService, deleteUserService, sendOTPService, verifyOTPService,changeAccountPasswordService } from "../services/userService.js";
export async function signUp(req, res){
    try{
        const details = req.body;
        const reponse = await signUpUser(details);
        return res.status(201).json({
            success : "true",
            message : "Successfully signed up"
        })
    }catch(error){
        console.log(error);
        return res.status(error.status).json({
            message : error.message
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
        return res.status(error.status).json({
            message : error.message
        })
    }
}

export async function getAllUsers(req, res){
    try{
        const prefix = req.query.prefix;
        const page = req.query.page;
        const limit = req.query.limit || 10;
        const users = await getAllUsersService(prefix, page, limit);
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
        const page = req.query.page;
        const limit = parseInt(req.query.limit || 10);
        const posts = await getAllPostFeedForUserService(user, page, limit);
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

export async function verifyToken(req, res){
    try{
        const token = req.headers["x-access-token"];
        if(!token){
            return res.status(200).json({
                success : true,
                valid : false
            })
        }
        const response = await verifyTokenService(token);
        if(response.valid){
            res.status(200).json({
                success : true,
                valid : true
            })
        }else{
            res.status(200).json({
                success : true,
                valid : false
            })
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export async function deleteUser(req, res){
    try{
        const user = req.user._id;
        const response = await deleteUserService(user);
        return res.status(200).json({
            success : true,
            data : response
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export async function sendOTP(req, res){
    try{
        const email = req.body.email;
        const response = sendOTPService(email);
        res.status(200).json({
            success : true,
            message : "OTP sent successfully",
            sent : true
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export async function verifyOTP(req, res){
    try{
        const email = req.body.email;
        const otp = req.body.otp;
        const response = verifyOTPService(email, otp);
        res.status(200).json({
            success : true,
            message : response.message,
            valid : response.valid,
            token : response.token
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export async function changeAccountPassword(req, res){
    try{
        const password = req.body.password;
        const email = req.body.email;
        const repsonse = await changeAccountPasswordService(email, password);
        return res.status(200).json({
            success : true,
            message : "Password changed successfully"
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "There was an error trying to change the password"
        })
    }
}