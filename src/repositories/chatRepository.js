import messages from "../schema/message.js";

export async function createMessage(message){
    try{
        const response = await messages.create(message);
        return response;
    }catch(error){
        console.log(error);
        return null;
    }
}