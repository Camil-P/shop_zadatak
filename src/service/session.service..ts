import config from "../../config";
import Session from "../model/session.model";
import User, { UserDocument } from "../model/user.model";
import { decode, sign } from '../utils/jwt.utils';

export async function createSession(userId: UserDocument['_id'], userAgent: string){
    const session = await Session.create({ user: userId, userAgent: userAgent });

    return session.toJSON();
}

export function createAccessToken({ user, session }: any) {

    const accessToken = sign(
        { user: user._id, session: session._id},
        {expiresIn: config.accessTokenTtl} // 15 min
    );
    
    return accessToken;
}

export function createRefreshToken(session: any){
    return sign(session, {expiresIn: config.refreshTokenTtl}); // 1 year
}

export async function reissueAccessToken(refreshToken: string){
    const { decoded } = decode(refreshToken);
    if(!decoded) { return false; }

    const session = await Session.findOne({ _id: decoded._id});
    if(!session) { return false; }

    const user = await User.findOne({ _id: session.user });
    if(!user) { return false; }

    const accessToken = createAccessToken({ user, session });
    return accessToken;
}