import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface ItemDocument extends mongoose.Document{
    itemName: string,
    quantity: number
}

export interface ShoppingListDocument extends mongoose.Document{
    user: UserDocument['id'],
    name: string,
    itemList: ItemDocument[],
}

const item = new mongoose.Schema(
    {
        itemName: { type: String, required: true},
        quantity: { type: Number, default: 0}
    }
);

const shoppingListSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true, unique: true},
        itemList: { type: [item], default: [] }
    },
    { timestamps: true });

const ShoppingList = mongoose.model<ShoppingListDocument>('ShoppingList', shoppingListSchema);

export default ShoppingList;
