export function imagevalidate(req, res, next){
    if(!req.file){
        res.status(400).json({message : "Invalid request"})
    }
    else{
        if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpeg"){
            res.status(400).json({message : "Invalid request"});
        }
        else{
            next();
        }
    }
}