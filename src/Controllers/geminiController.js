import { generateContentService } from "../services/geminiService.js"

export const generateContent = async(req, res)=>{
    try{
        const prompt = req.query.prompt;
        const response = await generateContentService(prompt);
        res.status(200).json({
            message : response
        });
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}