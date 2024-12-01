import { updateProfileService, getProfileService, deleteProfilePictureFromCloudService, getExploreProfileService } from "../services/profileService.js";
export async function getProfileUpdate(req, res){
    try{
        const updateObject = {};
        const user = req.user._id;
        if(req.file){
            updateObject.image = req.file.path;
            updateObject.public_id = req.file.filename;
        }
        if(req.body.bio){
            updateObject.bio = req.body.bio;
        }
        if(req.body.name){
            updateObject.name = req.body.name;
        }
        const response = await updateProfileService(updateObject, user);
        return res.status(201).json({
            success : true,
            data : response
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export async function getProfile(req, res){
    try{
        const user = req.user._id;
        const response = await getProfileService(user);
        return res.status(200).json({
            success : true,
            message : "Profile has been retrieved succesfully",
            data : response
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

export async function deleteProfilePictureFromCloud(req, res, next){
    try{
        if(req.file){
            const profile = await getProfileService(req.user._id);
            console.log(profile, "from delete profile picture");
            const public_id = profile.public_id;
            console.log(public_id);
            if(!public_id){
                return next();
            }
            const response = await deleteProfilePictureFromCloudService(public_id);
            console.log(response);
            return next();
        }else{
            return next();
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export async function getExploreProfile(req, res){
    try{
        const username = req.query.username;
        const response = await getExploreProfileService(username);
        return res.status(200).json({
            success : true,
            data : response
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}