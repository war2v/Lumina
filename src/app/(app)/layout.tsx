import { Toaster } from "@/components/ui/sonner";
import Footer from "./_components/Footer";
import Nav from "./_components/Nav";


export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="background-container">
        <Nav />
        {children}
        <Footer />
        <Toaster />
    </div>
  );
}
