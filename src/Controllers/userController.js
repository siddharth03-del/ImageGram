import { signUpUser , signInUser } from "../services/userService.js";
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