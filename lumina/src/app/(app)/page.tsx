import { getUser } from "@/lib/supabase/getUserServer";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Problem from "./_components/Psol";

export default function Home() {
  return (
    <section className="pt-5 sm:pt-16 lg:pt-5 dark:bg-gradient-to-b dark:from-black dark:to-gray-950">
        <Hero />
        <Problem />
        <Features />
        <Footer />
    </section>


  );
};

