export function imagevalidate(req, res, next){
    try{
        console.log(req.file);
        if(!req.file){
            return res.status(500).json({
                success : true,
                message : "Invalid request"
            })
        }
        else{
            console.log("Enterd image validator");
            console.log(req.file.mimetype);
            console.log(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpeg");
            if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpeg"){
                console.log("Error uploading the image");
                return res.status(500).json({
                    success : true,
                    message : "Invalid request"
                });
            }
            else{
                console.log("I have got the image");
                next();
                return;
            }
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "there was an error in image validator"
        })
    }
}