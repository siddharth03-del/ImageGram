import * as OTPAuth from "otpauth";
import { totpstore } from "../Storage/totpStore.js";
export function generateOTP(email){
    let secret;
    if(totpstore.has(email)){
        secret = totpstore.get(email);
    }
    else{
        secret = new OTPAuth.Secret({size : 20});
        totpstore.set(email, secret);
    }
    const totp = new OTPAuth.TOTP({
        issuer : "ACME",
        label : "Alice",
        algorithm : "SHA1",
        digits : 6,
        period : 120,
        secret : secret,
    })
    const otp = totp.generate();
    return otp;
}