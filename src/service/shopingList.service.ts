import ShoppingList, { ShoppingListDocument } from "../model/shoppingList.model";

export async function createShopingList(shoppingList: ShoppingListDocument){
    return ShoppingList.create(shoppingList);
}