import { totpstore } from "../Storage/totpStore.js";
import * as OTPAuth from "otpauth";
export function verifyOTP(email, otp){
    try{
        const secret = totpstore.get(email);
        const totp = new OTPAuth.TOTP({
            issuer : "ACME",
            label : "Alice",
            algorithm : "SHA1",
            digits : 6,
            period : 120,
            secret : secret,
        })
        const delta = totp.validate({token : otp, window : 1});
        if(delta !== null){
            return true;
        }
        else{
            return false;
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}