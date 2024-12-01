import { model } from 'mongoose';
import Post from '../schema/post.js';
import mongoose from 'mongoose';
export const createPost = async (caption, image, public_id ,user)=>{
    try{
        const newPost = await Post.create({caption, image, public_id ,user});
        return newPost;
    }catch(error){
        console.log(error);
    }
}
export const findAllPosts = async (offset, limit, user) =>{
    try{
        const posts = await Post.find({user : user}).sort({createdAt: -1}).skip(offset).limit(limit)
        .populate('user', "username")
        .exec();
        console.log(posts);
        return posts;
    }catch(error){
        console.log(error);
    }
}
export const countAllPosts = async ()=>{
    try{
        const count = Post.countDocuments();
        return count;
    }catch(error){
        console.log(error);
    }
}

export const findPostById = async (id) => {
    try {
        const matchStage = await Post.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } }
        ]);
        console.log('Match Stage:', matchStage);

        const lookupUserStage = await Post.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            }
        ]);
        console.log('Lookup User Stage:', lookupUserStage);

        const lookupProfileStage = await Post.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $lookup: {
                    from: "profiles",
                    localField: "user._id",
                    foreignField: "user",
                    as: "userProfile"
                }
            }
        ]);
        console.log('Lookup Profile Stage:', lookupProfileStage);

        const finalStage = await Post.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $lookup: {
                    from: "profiles",
                    localField: "user._id",
                    foreignField: "user",
                    as: "userProfile"
                }
            },
            { $unwind: "$userProfile" },
            {
                $project: {
                    caption: 1,
                    image: 1,
                    public_id: 1,
                    count_likes: 1,
                    comments: 1,
                    "user._id": 1,
                    "user.username": 1,
                    "userProfile.image": 1
                }
            }
        ]).exec();
        console.log('Final Stage:', finalStage);
        
        return finalStage.length ? finalStage[0] : null;
    } catch (error) {
        console.error(error);
    }
};


export const deletePostById = async(id) =>{
    try{
        const post = await Post.findByIdAndDelete(id);
        return post;
    }catch(error){
        console.log(error);
    }
}

export const updateById = async (id, updateObject) =>{
    try{
        const post = await Post.findByIdAndUpdate(id, updateObject, {new : true});
        return post;
    }catch(error){
        console.log(error);
    }
}

export const updatePostLike = async(post_id)=>{
    try{
        const post = await Post.findByIdAndUpdate({_id : post_id}, {$inc:{count_likes : 1}}, {new : true});
        return post;
    }catch(error){
        console.log(error);
    }
}

export const getPostFromFollowingArray = async(following)=>{
    try{
        const posts = await Post.find({user : {$in : following}});
        return posts;
    }catch(error){
        console.log(error);
    }
}

export const getPostsOtherThanUserId = async(user_id, page, limit) => {
    try {
        console.log(user_id);
        const skip = limit * (page - 1);
        const posts = await Post.aggregate([
            { $match: { user: { $ne: user_id } } },
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: 'users', // Assuming the collection name is 'users'
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {$unwind : '$user'},
            {
                $lookup: {
                    from: 'profiles', // Assuming the collection name is 'profiles'
                    localField: 'user._id',
                    foreignField: 'user',
                    as: 'userProfile'
                }
            },
            { $unwind: '$userProfile' },
            {
                $project: {
                    caption: 1,
                    image: 1,
                    public_id: 1,
                    count_likes: 1,
                    comments: 1,
                    'user._id': 1,
                    'user.username': 1,
                    'userProfile.image' : 1,
                }
            }
        ]).exec();
        console.log(posts);
        return posts;
    } catch (error) {
        console.log(error);
    }
};


export const getNumberOfPostsByUserId = async(user_id)=>{
    try{
        const count = await Post.countDocuments({user : user_id});
        return count;
    }catch(error){
        console.log(error);
    }
}