import { Request, Response } from 'express';
import { omit } from 'lodash';
import { requiresUser } from '../middleware';
import { changePasswordSchema, createUserSchema } from '../schema/user.schema';
import { createUser, hashUpdatedPassword, updatePassword } from '../service/user.service';
import { use, validateSchema, controller, post, put } from './decorators';
 
@controller('users')
export class UserController{

    @validateSchema(createUserSchema)
    @post()
    async createUserHandler(req: Request, res: Response){
        try {
            const user = await createUser(req.body);
            return res.send(omit(user.toJSON(), 'password'));
        } 
        catch (err) {
            return res.status(409).send('Error! Email already exists');
        }
    }

    @use(requiresUser)
    @validateSchema(changePasswordSchema)
    @put()
    async changePasswordHandler(req: Request, res: Response){
        //@ts-ignore
        const userId = req.user._id;
        const hashedPassword = await hashUpdatedPassword(req.body.password);

        const user = await updatePassword({ userId }, { password: hashedPassword }, { new: true } );
        
        if(user) { return res.status(200).send('Password successfully changed'); }
        return res.status(500).send('Failed to change password');
    }
}