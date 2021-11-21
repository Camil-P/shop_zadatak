import { NextFunction, Request, Response } from "express";
import { clearCache } from "../utils/cache";

const cleanCache = async ( req: Request, res: Response, next: NextFunction) => {
    const handlerResponse = await next();

    console.log('handlerResponse: ' + handlerResponse);
    console.log('Res: ' + res);
    
    // @ts-ignore
    clearCache(req.user._id);
}

export default cleanCache;