import { z } from "zod";

export const SignUpSchema = z.object({
    username: z.string().min(4, {message: 'Username must be atleast 4 characters'}),
    email: z.string().email({ message: 'Invalid email address'}),
    first_name: z.string().min(1, {message: 'Atleast 1 character required'}),
    last_name: z.string().min(1, {message: "Atleast 1 character is required"}),
    password: z.string().min(6, { message: 'Password must be atleast 6 characters'}),
    password2: z.string().min(6, { message: 'Password must be atleast 6 characters'}),
})
 .refine((data) => data.password === data.password2, {
  message: "Passwords must match",
  path: ["password2"],
 });

export type SignUpFormData = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z.string().email({message: 'Invalid Email'}),
  password: z.string().min(6),
});

export type SignInFormData = z.infer<typeof SignInSchema>;