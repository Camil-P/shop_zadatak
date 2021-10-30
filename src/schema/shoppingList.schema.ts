import { object, string, array, number } from "yup";

export const createShoppingListSchema = object({
    body: object({
        name: string().required('Value "name" of shopping list is required'),
        itemList: array().of(object({
            itemName: string(),
            quantity: number()
        }))
    }),
});
