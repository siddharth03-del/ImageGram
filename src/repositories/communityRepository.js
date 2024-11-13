import community from "../schema/community.js"
export const followUser = async(user, follow)=>{
    try{
        const userObject = await getUserCommunityByUserId(user);
        const followObject = await getUserCommunityByUserId(follow);
        console.log(userObject);
        console.log(followObject);
        userObject.following.push(follow);
        followObject.followers.push(user);
        await userObject.save();
        await followObject.save();
        return true;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getUserCommunityByUserId = async(userId)=>{
    try{
        const userObject = await community.find({user : userId});
        return userObject[0];
    }catch(error){
        console.log(error);
        throw{
            status : 500,
            message : "Internal server error"
        }
    }
}

export const createUserCommunity = async(user_id)=>{
    try{
        const userCommunity = community.create({user : user_id});
        return userCommunity;
    }catch(error){
        console.log(error);
    }
}

export const unFollowUser = async(user, unfollow)=>{
    try{
        await community.updateOne({user : user}, {$pull : {following : unfollow}});
        await community.updateOne({user : unfollow}, {$pull : {followers : user}});
        return true;
    }catch(error){
        console.log(error);
        throw error;
    }
}