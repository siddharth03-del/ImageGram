import { findPostById } from "../repositories/postRepository.js";
import { createPostService, getAllPostService,  deletePostService, updatePostService, getPostById , deletePostCloudService} from "../services/postService.js";
export async function createPost(req, res){
    try{
        console.log(req.file, "file object");
        const post = await createPostService({
        caption: req.body.caption,
        image: req.file.path,
        public_id : req.file.filename,
        user : req.user._id
    });
    return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post
    });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error
        })
    }
}

export async function getAllPosts(req, res){
    try{
        const limit = req.query.limit || 100;
        const offset = req.query.offset || 0;
        const user = req.user._id;
        const posts = await getAllPostService(offset, limit, user);
        return res.status(201).json({
            success: true,
            message : "All posts fetched successfully",
            data : posts
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message : "Internal server error"
        })
    }
}

export async function deletePost(req, res){
    try{
        const id = req.query.id;
        const post = await getPostById(id);
        if(!post){
            return res.status(500).json({
                success: false,
                message: "Post not found"
            })
        }
        if(post.user != req.user._id){
            return res.status(500).json({
                success : false,
                message : "not authorized"
            })
        }
        const public_id = post.public_id;
        console.log(public_id, "public_id");
        const result = await deletePostCloudService(public_id);
        console.log(result);
        const response = await deletePostService(id);
        return res.status(201).json({
            success: true,
            message: "Post deleted successfully",
            data : response
        }) 
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message : "Internal server error"
        })
    }
}

export async function updatePost(req, res){
    try{
        const updateObject = req.body;
        console.log(updateObject , "updateObject");
        if(req.file){
            updateObject.image = req.file.path;
            updateObject.public_id = req.file.filename;
        }
        const id = req.params.id;
        console.log(id, "id");
        const response = await updatePostService(id, updateObject);
        return res.status(201).json({
            success : true,
            message : "Post updated successfully",
            data : response
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Interval server error"
        })
    }
}

export async function deletePostFromCloud(req, res, next){
    try{
        if(req.file){
            const id = req.params.id;
            const post = await getPostById(id);
            const public_id = post.public_id;
            const response = await deletePostCloudService(public_id);
            console.log(response);
            next();
        }
        else{
            next()
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}

export async function getSinglePost(req, res){
    try{
        const postId = req.query.postId;
        const response = await findPostById(postId);
        if(!response){
            return res.status(404).json({
                success : false,
                message : "Post not found"
            })
        }
        return res.status(200).json({
            success : true,
            data : response
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}