import users from "../schema/user.js";
export const userSignUp = async (detailsObject) =>{
    try{
        const username = detailsObject.username;
        const email = detailsObject.email;
        const password = detailsObject.password;
        const user = await users.create({username, email, password});
        return user;
    }catch(error){
        console.log(error);
        if(error.name == "ValidationError"){
            throw {
                status : 400,
                message : "Invalid email format"
            }
        }
        throw {
            status : 500,
            message : "Unexpected error occured"
        }
    }
}

export const findUserByEmailId = async (emailId) =>{
    try{
        const user = await users.findOne({email : emailId}).exec();
        console.log(user);
        return user;
    }catch(error){
        console.log(error);
    }
}
export const findUserById = async (_id) => {
    try{
        const user = await users.findById(_id);
        return user;
    }catch(error){
        console.log(error);
    }
}

export const findAllUsersByPrefix = async (prefix, page, limit) =>{
    try{
        const skip = limit*(page -1);
        const user = await users.find({username : {$regex : prefix, $options : "i"}}, {"username" : 1, "_id" : 1});
        return user;
    }catch(error){
        console.log(error);
    }
}

export const getUsername = async (userId)=>{
    try{
        const username = await users.findOne({_id : userId}, {username : 1});
        return username;
    }catch(error){
        console.log(error);
    }
}

export const findUserByUsername = async (username)=>{
    try{
        const user = await users.findOne({username});
        return user;
    }catch(error){
        console.log(error);
    }
}