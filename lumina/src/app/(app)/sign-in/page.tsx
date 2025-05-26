'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/browserClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SignInSchema, SignInFormData } from '@/schema/AuthSchema';
import { useUser } from '@/hooks/useUser';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Footer from "../_components/Footer";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignInPage = () => {
    const { user } = useUser();
    const router = useRouter();
    const supabase = createClient();
    if (user) {
        router.push('/user/dashboard');
    }

    
    const [error, setError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({ resolver: zodResolver(SignInSchema) });

    const onSubmit = async (data: SignInFormData) => {
        setError('');
        const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
        });

        if (error) {
        setError(error.message);
        } else {
        router.push('/user/dashboard');
        }
    };

    return ( 
        <div className=" py-5 sm:py-16 lg:py-12">
            <div className="px-4 py-10 mx-auto max-w-[50rem] sm:px-6 lg:px-8">
                <Card>
                    <CardContent>
                        <CardHeader>
                            <h1 className="text-2xl text-center font-bold">Sign In</h1>
                        </CardHeader>
                    </CardContent>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3 px-10">
                            <Input placeholder="Email"  {...register('email')}  type="email" />
                            <Input placeholder="Password" {...register('password')} type="password" />
                            <div className="flex items-center gap-x-2">
                                <Checkbox /> 
                                <h3> Remember Me</h3>
                            </div>
                            <Button type="submit" disabled={isSubmitting}>Sign In</Button>
                            <Button variant="outline">Sign In With Google</Button>
                            <p>Need an Account?<Link href="/sign-up" className="text-red-500"> Sign Up</Link></p>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
     );
}
 
export default SignInPage;