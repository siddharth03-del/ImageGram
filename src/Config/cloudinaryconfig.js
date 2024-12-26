import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from './server_config.js';
cloudinary.config({
    cloud_name : CLOUD_NAME,
    api_key : CLOUDINARY_API_KEY,
    api_secret : CLOUDINARY_API_SECRET,
    secure : true
});
const cloudstorage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder: '/ImageGram',
        format: async (req, file) => 'png',
        public_id: (req, file)=> `${Date.now()}-${file.originalname}`
    }
})
export const parser = multer({storage : cloudstorage, 
    limits : {
        fileSize : 1024 * 1024 * 50
    }
});
