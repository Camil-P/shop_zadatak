import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends mongoose.Document{
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

UserSchema.pre('save', async function(next){
    let user = this as UserDocument;

    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt();

    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
})

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;