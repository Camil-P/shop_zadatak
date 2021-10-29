import { LeanDocument } from "mongoose";
import config from "../../config";
import Session, { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
import { sign } from '../utils/jwt.utils';

export async function createSession(userId: UserDocument['_id'], userAgent: string){
    const session = await Session.create({ user: userId, userAgent: userAgent });

    return session.toJSON();
}

export function createAccessToken({ user, session }: any) {
    console.log(user);
    console.log(session);
    
    const accessToken = sign(
        {...user, session: session._id},
        {expiresIn: config.accessTokenTtl} // 15 min
    );
    
    return accessToken;
}

export function createRefreshToken(session: any){
    return sign(session, {expiresIn: config.refreshTokenTtl}); // 1 year
}