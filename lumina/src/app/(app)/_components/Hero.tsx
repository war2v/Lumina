import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/supabase/getUserServer";
import { Presentation, Search } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

const Hero = async () => {
  const { user } = await getUser();

  return user === null ? (
    <div className="px-4 mx-auto max-w-[100rem] sm:px-6 lg:px-8">
      <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <p className="text-base font-semibold tracking-wider text-yellow-400 uppercase">
            Cut the clutter. Keep your audience focused.
          </p>
          <h1 className="mt-4 text-2xl font-bold text-black lg:mt-8 sm:text-4xl xl:text-6xl">
            Share resources instantly — so your audience can stay fully engaged.
          </h1>
          <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
            Don’t just present. Empower your audience to engage.
          </p>

          <Button asChild>
            <Link href="#" className="my-3">
              Join for free
            </Link>
          </Button>
          <p className="mt-5 text-gray-600">
            Already joined us?{" "}
            <Button asChild variant="outline">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </p>
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
          <p className="text-base font-semibold tracking-wider text-yellow-400 uppercase">
            Welcome Back!
          </p>
          <div className="flex items-center gap-x-4 mt-4 text-2xl font-bold text-black lg:mt-8 sm:text-4xl xl:text-6xl">
            <h1>Create a Presentation</h1>
            <Button>
              <Presentation />
            </Button>
          </div>

          <div className="flex items-center gap-x-4 mt-4 text-lg font-bold text-yellow-300 lg:mt-8">
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
