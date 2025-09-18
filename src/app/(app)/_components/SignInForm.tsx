"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/browserClient";
import { useRouter } from "next/navigation";
import { SignInSchema, SignInFormData } from "@/schema/AuthSchema";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const SignInForm = () => {
  const router = useRouter();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>({ resolver: zodResolver(SignInSchema) });

  const onSubmit = async (data: SignInFormData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      //console.log(error?.message);
      toast(error.message);
    } else {
      router.push("/user/home");
    }
  };

  return (
    <div className="px-4 py-10 mx-auto max-w-[50rem] sm:px-6 lg:px-8">
      <Card>
        <CardContent>
          <CardHeader>
            <h1 className="text-2xl text-center font-bold">Sign In</h1>
          </CardHeader>
        </CardContent>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-3 px-10"
          >
            <Input placeholder="Email" {...register("email")} type="email" />
            <Input
              placeholder="Password"
              {...register("password")}
              type="password"
            />
            <div className="flex items-center gap-x-2">
              <Checkbox />
              <h3> Remember Me</h3>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              Sign In
            </Button>
            <Button variant="outline">Sign In With Google</Button>
            <p>
              Need an Account?
              <Link href="/sign-up" className="text-red-500">
                {" "}
                Sign Up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInForm;
