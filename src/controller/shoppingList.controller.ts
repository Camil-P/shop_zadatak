import { Request, Response } from 'express';
import { cleanCache, requiresUser } from "../middleware";
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
        // @ts-ignore
        const shoppingLists = await getUsersShoppingLists({ user: req.user.id });
        res.send(shoppingLists);
    }

    @use(requiresUser)
    @use(cleanCache)
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
    @use(cleanCache)
    @del(':id')
    async deleteShopingListHandler(req: Request, res: Response){
        try {
            const _id = req.params.id;
    
            //@ts-ignore
            const deleteConfirmation = await deleteShoppingList({ _id, user: req.user._id });
    
            res.send(deleteConfirmation ? 'Item successfully deleted' : 'No such item exists');
        } 
        catch (err) {
            return res.status(400).send(err.message);
        }
    }

    @use(requiresUser)
    @use(cleanCache)
    @validateSchema(updateShoppingListSchema)
    @put(':id')
    async updateShoppingListHandler(req: Request, res: Response){
        try {
            //@ts-ignore
            const userId = req.user._id;

            const updatedShoppingList = await updateShoppingList({ _id: req.params.id, user: userId }, req.body, { new: true })
            res.send(updatedShoppingList);            
        } 
        catch (err) {
            return res.status(400).send(err.message);
        }
    }
}