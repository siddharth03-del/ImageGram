import { createMessageService } from "../services/chatService.js";

export function joinRoomHandler(io, socket){
    socket.on("JOINROOM", async function(data, cb){
        const {userId} = data;
        socket.join(userId);
        console.log("I have joined the room");
        cb({
            success : true,
            message : "You have joined the room"
        })
    }) 
}
export function messageReceivedHandler(io, socket){
    socket.on("MESSAGE", async function(data, cb){
        console.log(data);
        const {sender, receiver, body} = data;
        const message = await createMessageService(data);
        console.log(message);
        io.to(receiver).emit("NEW_MESSAGE", message);
        cb({
            success : true,
            message : "Message has been sent to the server"
        })
    })
}