import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return ( 
        <div className="px-4 mx-auto max-w-[100rem] sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                    <p className="text-base font-semibold tracking-wider text-yellow-400 uppercase">Cut the clutter. Keep your audience focused.</p>
                    <h1 className="mt-4 text-2xl font-bold text-black lg:mt-8 sm:text-4xl xl:text-6xl">Share resources instantly — so your audience can stay fully engaged.</h1>
                    <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">Don’t just present. Empower your audience to engage.</p>

                    <Button asChild>
                      <Link href="#" className="my-3">
                        Join for free
                      </Link>
                    </Button>
                    <p className="mt-5 text-gray-600">Already joined us? <Button asChild variant="outline"><Link href="/sign-in">Sign In</Link></Button></p>
                </div>
                <div className="flex justify-center items-center">
                  <Image src="/LP.png" objectFit="true" alt="Image" width={400} height={650}/>
                </div>
            </div>
        </div>
     );
}
 
export default Hero;