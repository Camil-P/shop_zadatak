import { Request, Response } from "express";
import { createSessionSchema } from "../schema/session.schema";
import { createAccessToken, createSession, createRefreshToken } from "../service/session.service.";
import { validatePassword } from "../service/user.service";
import { controller, post, validateSchema } from "./decorators";


@controller('sessions')
export class SessionController{

    @validateSchema(createSessionSchema)
    @post()
    async createUserSessionHandler(req: Request, res: Response) {
        const user = await validatePassword(req.body);
        if (!user) {
            return res.status(404).send('Invalid username or password');
        }

        const session = await createSession(user._id, req.headers['user-agent'] || '');

        const accesToken = createAccessToken({ user, session });

        const refreshToken = createRefreshToken(session); 

        return res.send({ accesToken, refreshToken });
    }
}