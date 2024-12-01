import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "user"
    },
    name: {
        type: String,
        default : ""
    },
    bio:{
        type : String,
        default : ""
    },
    followers:{
        type: Number,
        default : 0
    },
    following:{
        type: Number,
        default : 0
    },
    posts:{
        type: Number,
        default : 0
    },
    image:{
        type: String,
        default : ""
    },
    public_id:{
        type : String,
        default : ""
    }
}, {timestamps : true});
const profile = mongoose.model("Profile", profileSchema);
export default profile;