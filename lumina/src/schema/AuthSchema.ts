import { z } from "zod";

export const SignUpSchema = z.object({
    username: z.string().min(4, {message: 'Username must be atleast 4 characters'}),
    email: z.string().email({ message: 'Invalid email address'}),
    password: z.string().min(6, { message: 'Password must be atleast 6 characters'}),
    password2: z.string().min(6, { message: 'Password must be atleast 6 characters'}),
});

export type SignUpFormData = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z.string().email({message: 'Invalid Email'}),
  password: z.string().min(6),
});

export type SignInFormData = z.infer<typeof SignInSchema>;