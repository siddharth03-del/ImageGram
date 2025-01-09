import feedback from "../schema/feedback.js"

export const postFeedback = async(object)=>{
    try{
        const response = await feedback.create(object);
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}