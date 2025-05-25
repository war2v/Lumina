
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
    return ( 
        <div className="p-4 flex bg-muted/50 ">
            <Link href="/" className="flex">
                <Image src="/logo.svg" alt="Logo" width={180} height={30} />
            </Link>
            <div className="flex justify-end w-full gap-x-4">
                <Button variant="default" asChild>
                    <Link href="/sign-in">Sign-In</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/sign-up">Sign-Up</Link>
                </Button>
            </div>
        </div>
     );
}
 
export default Nav;