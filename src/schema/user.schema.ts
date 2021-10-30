import { string, object, ref } from 'yup';

export const createUserSchema = object({
    body: object({
        email: string().required('Email is required').email('Must be a valid email'),
        password: string().required('Password is required').min(6, 'Password must contain 6 characters minimum'),
    }),
}); 

export const changePasswordSchema = object({
    body: object({
        password: string().required('Password is required').min(6, 'Password must contain 6 characters minimum'),
        passwordConfirmation: string().oneOf([ref('password'), null], 'Must match password'),
    })
});