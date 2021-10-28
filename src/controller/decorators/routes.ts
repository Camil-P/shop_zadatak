import { RequestHandler } from 'express';
import 'reflect-metadata';
import { MetadataKeys } from './enum/MetadataKey';
import { RouteMethodes } from './enum/RouteMethodes';

interface RouteHandlerDescriptor extends PropertyDescriptor{
    value?: RequestHandler;
}

function bindRoutes(method: RouteMethodes){
    return function (routePath?: string): Function{
        return function(target: any, key: string, desc: RouteHandlerDescriptor){
            Reflect.defineMetadata(MetadataKeys.method, method, target, key);
            Reflect.defineMetadata(MetadataKeys.path, routePath, target, key);
        }
    }
}

export const post = bindRoutes(RouteMethodes.post);