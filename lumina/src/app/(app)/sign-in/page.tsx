import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Footer from "../_components/Footer";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignInPage = () => {
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
                        <form className="flex flex-col gap-y-3 px-10">
                            <Input placeholder="Username" />
                            <Input placeholder="Password" />
                            <div className="flex items-center gap-x-2">
                                <Checkbox /> 
                                <h3> Remember Me</h3>
                            </div>
                            <Button>Sign In</Button>
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