import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator';
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        unique : "The username already exists",
        minLength : 5
    },
    email : {
        type : String,
        required : true,
        unique : true,
        unique : "The email already in use",
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
},{
    Timestamp : true
})
userSchema.plugin(uniqueValidator, {message : `Error, expected {PATH} to be unique`})
userSchema.pre('save', function modifyPassword(next){
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const hashed = bcrypt.hashSync(user.password, SALT);
    user.password = hashed;
    next();
})
const users = mongoose.model("user", userSchema);
export default users;