import profile from "../schema/profile.js";
export const updateProfile = async (user, updateObject)=>{
    try{
        console.log(updateObject)
        const updated = await profile.findOneAndUpdate({user: user}, updateObject, {new : true});
        return updated;
    }catch(error){
        console.log(error);
    }
}

export const createProfile = async (user)=>{
    try{
        const created = await profile.create({user: user});
        return created;
    }catch(error){
        console.log(error);
    }
}

export const getProfile = async ( user )=>{
    try{
        const response = await profile.findOne({user: user})
        .populate("user", "username")
        .exec();
        return response;
    }catch(error){
        console.log(error);
    }
}

export const updateProfilePostsAdd = async ( user )=>{
    try{
        const response = await profile.findOneAndUpdate({user : user}, {$inc : {posts : 1}}, {new : true});
        return response;
    }catch(error){
        console.log(error);
    }
}

export const updateProfilePostsDelete = async ( user )=>{
    try{
        const response = await profile.findOneAndUpdate({user : user}, {$inc : {posts : -1}}, {new : true});
        return response;
    }catch(error){
        console.log(error);
    }
}

export const updateProfileFollowersAdd = async (user)=>{
    try{
        const response = await profile.findOneAndUpdate({user : user}, {$inc : {followers :1}}, {new : true});
        return response;
    }catch(error){
        console.log(error);
    }
}

export const updateProfileFollowersDelete = async(user)=>{
    try{
        const response = await profile.findOneAndUpdate({user : user}, {$inc : {followers : -1}}, {new : true});
        return response;
    }catch(error){
        console.log(error);
    }
}

export const updateProfileFollowingAdd = async(user)=>{
    try{
        const response = await profile.findOneAndUpdate({user : user}, {$inc : {following :1}}, {new : true});
        return response;
    }catch(error){
        console.log(error);
    }
}

export const updateProfileFollowingDelete = async(user)=>{
    try{
        const response = await profile.findOneAndUpdate({user : user}, {$inc : {following : -1}}, {new : true});
        return response;
    }catch(error){
        console.log(error);
    }
}

export const getImageAndNameByUserId = async(userId)=>{
    try{
        const response = await profile.find({user : userId},{"image" : 1, "name" : 1});
        console.log(response);
        return response[0];
    }catch(error){
        console.log(error);
    }
}