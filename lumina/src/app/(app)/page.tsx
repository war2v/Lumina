import { getUser } from "@/lib/supabase/getUserServer";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Problem from "./_components/Psol";

export default async function Home() {
  return (
    <section className=" py-5 sm:py-16 lg:py-12">
        <Hero />
        <Problem />
        <Features />
        <Footer />
    </section>


  );
};

