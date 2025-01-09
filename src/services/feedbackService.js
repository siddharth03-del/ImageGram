import { postFeedback } from "../repositories/feedbackRepository.js";
export const postFeedbackService = async(details)=>{
    try {
        const response = await postFeedback(details);
        return response;
    }catch(error){
        console.log(error);
        throw {message : "Internal server error"};
    }
}