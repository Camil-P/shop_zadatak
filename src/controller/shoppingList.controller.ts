import { Request, Response } from 'express';
import { requiresUser } from "../middleware";
import { createShoppingListSchema } from "../schema/shoppingList.schema";
import { createShopingList } from '../service/shopingList.service';
import { controller, post, use, validateSchema } from "./decorators";

@controller('lists')
export class ShoppingList{

    @use(requiresUser)
    @validateSchema(createShoppingListSchema)
    @post()
    async createShopingListHandler(req: Request, res: Response){
        //@ts-ignore
        const userId = req.user._id;
        const body = req.body;

        const shoppingList = await createShopingList({ ...body, user: userId });

        res.send(shoppingList);
    }
}