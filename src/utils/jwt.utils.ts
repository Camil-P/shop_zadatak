import jwt from "jsonwebtoken";
import config from "../../config";


export function sign(objectToSign: Object, options?: jwt.SignOptions | undefined){
    return jwt.sign(objectToSign, config.privateKey, options);
}