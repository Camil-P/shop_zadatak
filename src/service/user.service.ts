import { omit } from "lodash";
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import User, { UserDocument } from "../model/user.model";
import bcrypt from 'bcrypt';

export async function findUser(userId: UserDocument['id']){
    return await User.findById(userId);
}

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

export async function updatePassword(query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions) {
    //@ts-ignore
    const user = await User.findOneAndUpdate(query, update, options);

    if(!user) { return false; }
    return user;
}

export async function hashUpdatedPassword(password: string){
    const salt = await bcrypt.genSalt();
    const hash = bcrypt.hashSync(password, salt);

    return hash;
}