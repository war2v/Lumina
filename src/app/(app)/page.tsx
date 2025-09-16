import { getUser } from "@/lib/supabase/getUserServer";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Problem from "./_components/Psol";

export default function Home() {
  return (
    <section className="pt-10">
        <Hero />
        <Problem />
        <Features />
    </section>


  );
};

