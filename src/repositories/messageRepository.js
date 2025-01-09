import messages from "../schema/message.js"

export const getAllMessages = async(details)=>{
    try{
        const {sender, receiver} = details;
        const response = messages.find({$or : [{sender : sender, receiver : receiver}, {sender:receiver, receiver : sender}]}).sort({"createdAt" : 1});
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}