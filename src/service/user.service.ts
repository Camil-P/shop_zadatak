import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import User, { UserDocument } from "../model/user.model";

export async function createUser(userInput: DocumentDefinition<UserDocument>): Promise<UserDocument>{
    try {
        return User.create(userInput);
    } 
    catch (err) {
        throw new Error(err);
    }
}

export async function validatePassword({ email, password }: { email: UserDocument['email'], password: string }){
    const user = await User.findOne({ email });

    if (!user) { return false; }

    const isValid = await user.comparePasswords(password);
    if (!isValid) { return false; }

    return omit(user.toJSON(), 'password');
}