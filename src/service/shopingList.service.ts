import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ShoppingList, { ShoppingListDocument } from "../model/shoppingList.model";

export async function getItemReport({ from, to }: { from: Date, to: Date }){
    return ShoppingList.aggregate([
        {
            $match: {
                updatedAt: { $gte: from, $lte: to }
            }
        },
        {
            $unwind: '$itemList'
        },
        {
            $group: {
                _id: '$itemList.itemName',
                quantity: { $sum: '$itemList.quantity' }
            }
        },
        {
            $project: {
                _id: 0,
                itemName: '$_id',
                quantity: 1
            }
        },
    ]);
}

export async function getUsersShoppingLists(query: FilterQuery<ShoppingListDocument>, options: QueryOptions = { lean: true }){
    return ShoppingList.find(query, {}, options);
}

export async function findShoppingList(query: FilterQuery<ShoppingListDocument>, options: QueryOptions = { lean: true }){
    return ShoppingList.findOne(query, {}, options);
}

export async function createShoppingList(shoppingList: ShoppingListDocument){
    return ShoppingList.create(shoppingList);
}

export async function updateShoppingList(
    query: FilterQuery<ShoppingListDocument>,
    update: UpdateQuery<ShoppingListDocument>,
    options: QueryOptions)
    {

        return ShoppingList.findOneAndUpdate(query, update, options);
}

export async function deleteShoppingList(query: FilterQuery<ShoppingListDocument>){
    return ShoppingList.deleteOne(query);
}
