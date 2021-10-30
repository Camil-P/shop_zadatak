import jwt from "jsonwebtoken";
import config from "../../config";

export function sign(objectToSign: Object, options?: jwt.SignOptions | undefined){
    return jwt.sign(objectToSign, config.privateKey, options);
}

export function decode(accessToken: string): { expired: boolean, decoded: any } {
    try{
        const decoded = jwt.verify(accessToken, config.privateKey);
        return { expired: false, decoded };
    }
    catch(err){
        return { expired: err.message === 'jwt expired', decoded: null };
    }
}
