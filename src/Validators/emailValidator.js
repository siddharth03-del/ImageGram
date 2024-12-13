import validator from "email-validator";
import { userByEmail } from "../services/userService.js";
export async function emailValidator(req, res, next){
    try{
        const email = req.body.email;
        console.log(req.body);
        const response = validator.validate(email);
        if(response){
            const user = await userByEmail(email);
            if(user){
                next();
                return;
            }
            return res.status(200).json({
                message : "User registered with following email not found",
                sent : false,
            });
        }
        else{
            return res.status(200).json({
                message: "Invalid Email",
                sent : false
            })
        }
    }catch(error){
        console.log(error);
        return res.status(404).json({
            success : false,
            message : "Email not found"
        })
    }
}