import { string, object } from 'yup';

export const createUserSchema = object({
    body: object({
        email: string().required('Email is required').email('Must be a valid email'),
        password: string().required('Password is required').min(6, 'Password must contain 6 characters minimum'),
    }),
}); 