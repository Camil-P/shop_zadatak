import { RequestHandler } from 'express';
import 'reflect-metadata';
import { MetadataKeys } from './enum/MetadataKey';

export function use(middleware: RequestHandler){
    return function(target: any, key: string, desc: PropertyDescriptor){
        const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];
        Reflect.defineMetadata(MetadataKeys.middleware, [ ...middlewares, middleware ], target, key);
    }
}

export function requires(middleware: RequestHandler){
    return function(target: any, key: string, desc: PropertyDescriptor){
        
    }
}