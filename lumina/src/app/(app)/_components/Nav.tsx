
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/supabase/getUserServer";
import Image from "next/image";
import Link from "next/link";
import Logout from "./logout";

const Nav = async () => {
  const { user } = await getUser();

  return (
    <div className="p-4 flex bg-muted/50 ">
      <Link href="/" className="flex">
        <Image src="/logo.svg" alt="Logo" width={180} height={30} />
      </Link>
      <div className="flex justify-end w-full gap-x-4">
        {user===null ? (
          <>
            <Button variant="default" asChild>
              <Link href="/sign-in">Sign-In</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/sign-up">Sign-Up</Link>
            </Button>
          </>
        ) : (
          <Logout />
        )}
      </div>
    </div>
  );
};

export default Nav;
