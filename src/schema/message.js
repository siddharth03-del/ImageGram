import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    body : {
        type : String,
        required : true,
        minLength : 1,
    },
    image : {
        type : String
    },
    sender : {
        type : String,
        required : true
    },
    receiver : {
        type : String,
        required : true
    }
}, {
    timestamps : true
});
const messages = mongoose.model('messages', messageSchema);
export default messages;
