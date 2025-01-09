import { model } from "../Config/geminiconfig.js"
export const generateContentService = async(prompt)=>{
    try{
        const response = await model.generateContent(prompt);
        return response;
    }catch(error){
        console.log(error);
        throw {
            message : "There was an error generating the content"
        }
    }
}