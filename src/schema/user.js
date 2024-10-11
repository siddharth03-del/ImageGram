import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        minLength : 5
    },
    email : {
        type : String,
        required : true,
        unique : true,
        minLength : 5,
        validate : {
            validator : function(emailValue){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
            },
            message : 'Invalid email format'
        },
    },
    password : {
        type : String,
        required : true,
        minLength : 5
    }
},     {
    Timestamp : true
})
const users = mongoose.model("user", userSchema);
export default users;