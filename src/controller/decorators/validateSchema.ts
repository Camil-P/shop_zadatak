import { AnySchema } from 'yup';
import 'reflect-metadata';
import { MetadataKeys } from './enum/MetadataKey';

export function validateSchema(schema: AnySchema){
    return function(target: any, key: string, desc: PropertyDescriptor){
        Reflect.defineMetadata(MetadataKeys.validator, schema, target, key);
    }
}