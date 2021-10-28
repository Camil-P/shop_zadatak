import { Request, Response } from 'express';
import { createUserSchema } from '../schema/user.schema';
import { createUser } from '../service/user.service';
import { validateSchema, controller, post } from './decorators';
 
@controller('users')
export class UserController{

    @validateSchema(createUserSchema)
    @post()
    async createUserHandler(req: Request, res: Response){
        try {
            const user = await createUser(req.body);
            return res.send(user.email);
        } 
        catch (err) {
            return res.status(409).send('Error! Email already exists');
        }
    }
}