import { Request, Response } from 'express';
import { requiresUser } from "../middleware";
import { createShoppingListSchema, updateShoppingListSchema } from "../schema/shoppingList.schema";
import { getItemReport, createShoppingList, deleteShoppingList, getUsersShoppingLists, updateShoppingList } from '../service/shopingList.service';
import { controller, get, post, put, del, use, validateSchema } from "./decorators";

@controller('lists')
export class ShoppingList{

    @use(requiresUser)
    @get('items')
    async getItemReport(req: Request, res: Response){
        const from = new Date(req.query.from?.toString() || 0);
        const to = new Date(req.query.to?.toString() || new Date());

        const itemList = await getItemReport({ from, to });
        return res.send(itemList);
    }

    @use(requiresUser)
    @get()
    async getShoppingListsHandler(req: Request, res: Response){
        //@ts-ignore
        const shoppingLists = await getUsersShoppingLists({ user: req.user._id });
        return res.send(shoppingLists);
    }

    @use(requiresUser)
    @validateSchema(createShoppingListSchema)
    @post()
    async createShopingListHandler(req: Request, res: Response){
        try {
            //@ts-ignore
            const userId = req.user._id;
            const body = req.body;

            const shoppingList = await createShoppingList({ ...body, user: userId });

            return res.send(shoppingList);
        } 
        catch (err) {
            return res.status(409).send('List name must be unique');
        }
    }

    @use(requiresUser)
    @del(':name')
    async deleteShopingListHandler(req: Request, res: Response){
        const name = req.params.name;

        //@ts-ignore
        const deleteConfirmation = await deleteShoppingList({ name, user: req.user._id });

        if(deleteConfirmation) { return res.send('Item successfully deleted'); }
        return res.send('No such items to delete');
    }

    @use(requiresUser)
    @validateSchema(updateShoppingListSchema)
    @put(':id')
    async updateShoppingListHandler(req: Request, res: Response){
        //@ts-ignore
        const updatedShoppingList = await updateShoppingList({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
        
        res.send(updatedShoppingList);
    }
}