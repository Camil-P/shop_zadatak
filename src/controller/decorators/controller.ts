import 'reflect-metadata';
import express from 'express';
import { AppRouter } from '../../AppRouter';
import { validateRequest } from '../../middleware';
import { MetadataKeys } from './enum/MetadataKey';
import { RouteMethodes } from './enum/RouteMethodes';

export function controller(controllerPath: string): Function{
    return function(target: Function, key: string, desc: PropertyDescriptor){
        
        const app: express.Router = AppRouter.getInstance();
        
        for(let key in target.prototype){

            const routeHandler = target.prototype[key];
            const method: RouteMethodes = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
            const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key) || '';
            const validationSchema = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];

            // console.log('mid: ' + middlewares + 'rH: ' + (typeof routeHandler) + 'vS: ' + (typeof validationSchema) + 'method: ' + method + ' route: ' + controllerPath + ' ' + path);

            app[method](`/api/${controllerPath}/${path}`, [...middlewares, validateRequest(validationSchema)], routeHandler);
        }
    }
}