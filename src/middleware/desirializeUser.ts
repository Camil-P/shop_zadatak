import { NextFunction, Request, Response } from "express";
import { reissueAccessToken } from "../service/session.service.";
import { findUser } from "../service/user.service";
import { decode } from "../utils/jwt.utils";


const desirializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = (req.headers['authorization'] || "").replace(/^Bearer\s/, "");
    const refreshToken = (req.headers['x-refresh'] || "").toString();

    if(!accessToken) { return next(); }

    const { expired, decoded } = decode(accessToken);

    if(decoded){
        // @ts-ignore
        req.user = await findUser(decoded.user);

        return next();
    }

    if(expired && refreshToken){
        const newAccessToken = await reissueAccessToken(refreshToken);

        if(newAccessToken) {
            res.setHeader('x-access-token', newAccessToken);

            const { decoded } = decode(newAccessToken);
            //@ts-ignore
            req.user = await findUser(decoded.user);
        }
        return next();
    }
    return next();
}

export default desirializeUser;