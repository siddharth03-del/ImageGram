import { postFeedbackService } from "../services/feedbackService.js";
export const postFeedback = async(req, res)=>{
    try{
        const text = req.body.text;
        const user = req.user._id;
        const response = await postFeedbackService({text, user});
        return res.status(200).json({
            success : true,
            message : "Feedback posted successfully"
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}