import { getAllMessages } from "../repositories/messageRepository.js";
export const getAllMessagesService = async(details)=>{
    try{
        const response = await getAllMessages(details);
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}