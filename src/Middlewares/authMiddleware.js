import { verifyJWT } from "../utils/jwt.js"
import { doesUserExist } from "../services/userService.js";
export const isAuthenticated =  async(req, res, next)=>{
    try{
        const token = req.headers["x-access-token"];
        if(!token){
            return res.status(500).json({
                success : false,
                message : "Token not provided"
            })
        }
        const user = verifyJWT(token);
        console.log(user, "user");
        if(!user){
            return res.status(500).json({
                success : false,
                message : "Token not provided"
            })
        }
        const userExist = await doesUserExist(user);
        console.log(userExist, "userExist");
        if(!userExist){
            return res.status(500).json({
                success : false,
                message : "User does not exist"
            })
        }
        req.user = userExist;
        next();
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}