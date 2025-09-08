import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/supabase/getUserServer";
import { Presentation, Search } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

const Hero = async () => {
  const { user } = await getUser();

  return user === null ? (
    <div className="px-4 mx-auto max-w-[100rem] lg:px-8">
      <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex flex-col">
          <h1 className="mt-4 text-2xl font-bold dark:text-white  lg:mt-8 sm:text-4xl xl:text-6xl">
            Present powerfully, share effortlessly.
          </h1>
          <p className="mt-4 text-base dark:text-white  lg:mt-8 sm:text-xl">
            Share resources instantly — so your audience can stay fully engaged.
          </p>

          <div className="flex justify-center items-center gap-x-4 m-4">
            <Button asChild variant="outline"size='lg'>
              <Link href="#" >
                Join Waitlist
              </Link>
            </Button>
            <Button asChild size='lg'>
                <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image src="/LP.png" alt="Image" width={400} height={650} />
        </div>
      </div>
    </div>
  ) : (
    <div className="px-4 mx-auto max-w-[100rem] sm:px-6 lg:px-8">
      <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <p className="text-base font-semibold tracking-wider uppercase">
            Welcome Back!
          </p>
          <div className="flex items-center gap-x-4 mt-4 text-2xl font-bold  lg:mt-8 sm:text-4xl xl:text-6xl">
            <h1>Create a Presentation</h1>
            <Button>
              <Presentation />
            </Button>
          </div>

          <div className="flex items-center gap-x-4 mt-4 text-lg font-bold  lg:mt-8">
            <h1>Search For a Presentation</h1>
            <Button variant="outline">
              <Search />
            </Button>
          </div>

          <Button asChild variant="outline">
            <Link href="/user/home" className="my-3">
              Dashboard
            </Link>
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <Image src="/LP.png" alt="Image" width={400} height={650} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
