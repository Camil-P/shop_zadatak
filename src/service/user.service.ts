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