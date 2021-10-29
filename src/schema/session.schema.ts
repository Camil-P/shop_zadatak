import { object, string } from 'yup';

export const createSessionSchema = object({
    body: object({
        email: string().email('Email must be valid').required('Email is required'),
        password: string().min(6, 'Password must contain minimum 6 characters').required('Password is required'),
    }),
});