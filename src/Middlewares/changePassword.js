import { verifyJWTPasswordChange } from "../utils/changepasswordjwt.js";

export const validRequestForChangePassword = (req, res, next) => {
    try{
        const token = req.headers['change-password'];
        let details;
        try{
            details = verifyJWTPasswordChange(token);
        }catch(error){
            return res.status(200).json({
                success : true,
                message : "Invalid change password request"
            })
        }
        const email = req.body.email;
        if(details.email !== email){
            return res.status(200).json({
                success : true,
                message : "Invalid change password request"
            })
        }
        next();
        return;

    }catch(error){
        console.log(error);
        return res.status(400).json({
            success : false,
            message : "Internal server error"
        })
    }
}