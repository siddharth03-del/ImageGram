import { createMessage } from "../repositories/chatRepository.js"

export const createMessageService = async(message) =>{
    try{
        const response = await createMessage(message);
        return response;
    }catch(error){
        console.log(error);
        return null;
    }
}