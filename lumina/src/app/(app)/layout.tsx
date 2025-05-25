import Nav from "./_components/Nav";
import "./landingpage.css"

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Nav />
        {children}
    </div>
  );
}
