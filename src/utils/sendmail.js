import { transporter } from "../Config/nodemailerconfig.js";
export async function sendOTP(email, token){
    try{
        const info = await transporter.sendMail({
            from : "ImageGram <siddharthsingh9361@gmail.com>",
            to : email,
            subject : "Hello",
            text : `token ${token}`,
        });
        console.log("Message send", info.messageId);
        return {
            success : true,
            message : "Message sent successfully",
            sent : true
        }
    }catch(error){
        console.log(error);
        setTimeout(()=>{
            sendEmail(req, res);
        }, 2000)
    }
}