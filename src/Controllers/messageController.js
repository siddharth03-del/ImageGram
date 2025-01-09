import { getAllMessagesService } from "../services/messageService.js";
export async function getAllMessages(req, res){
    try{
        const sender = req.query.sender;
        const receiver = req.query.receiver;
        const response = await getAllMessagesService({sender, receiver});
        res.status(200).json({
            success : true,
            data : response
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}