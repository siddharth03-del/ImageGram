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
    }
}

export const findUserByEmailId = async (emailId) =>{
    try{
        const user = await users.find({email : emailId}).exec();
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