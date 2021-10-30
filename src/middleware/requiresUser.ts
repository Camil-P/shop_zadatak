import { NextFunction, Request, Response } from "express";

const requiresUser = async ( req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if(!req.user) { return res.sendStatus(403); }

    return next();
}

export default requiresUser;