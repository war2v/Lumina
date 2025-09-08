"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { SignUpSchema, SignUpFormData } from "@/schema/AuthSchema";
import Footer from "../_components/Footer";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/browserClient";

const SignUpForm = () => {
  const router = useRouter();
  const supabase = createClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
        },
      },
    });

    if (error) {
      ////console.log(error.message);
    } else {
      ////console.log("Success");
      router.push("/sign-in");
    }
  };

  return (
    <div className="px-4 py-10 mx-auto max-w-[50rem] sm:px-6 lg:px-8">
      <Card>
        <CardContent>
          <CardHeader>
            <h1 className="text-2xl text-center font-bold">Sign Up</h1>
          </CardHeader>
        </CardContent>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-3 px-10"
          >
            <Input placeholder="Email" type="email" {...register("email")} />
            <Input
              placeholder="First Name"
              type="text"
              {...register("first_name")}
            />
            <Input
              placeholder="Last Name"
              type="text"
              {...register("last_name")}
            />
            <Input
              placeholder="Username"
              type="text"
              {...register("username")}
            />

            <Input
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            <Input
              placeholder="Password2"
              type="password"
              {...register("password2")}
            />
            <div className="flex items-center gap-x-2">
              <Checkbox />
              <h3> Remember Me</h3>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              Sign Up
            </Button>
            <Button variant="outline">Sign Up Using Google</Button>
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
      <Footer />
    </div>
  );
};

export default SignUpForm;
