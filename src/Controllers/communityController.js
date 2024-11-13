import { followUserService , unFollowUserService} from "../services/communityService.js";
export async function followUser(req, res){
    try{
        const user = req.user._id;
        const follow = req.body.follow;
        const response = await followUserService(user, follow);
        res.status(201).json({
            success : true,
            message : "user follow successfully"
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export async function unFollowUser(req, res){
    try{
        const user = req.user._id;
        const follow = req.body.unfollow;
        const response = await unFollowUserService(user, follow);
        res.status(201).json({
            success : true,
            message : "user unfollow successfully"
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}