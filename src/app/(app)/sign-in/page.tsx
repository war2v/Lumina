import { createClient } from "@/lib/supabase/serverClient";
import SignInForm from "../_components/SignInForm";
import { redirect } from "next/navigation";
import Footer from "../_components/Footer";

const SignInPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/user/home");
  }

  return (
    <div className="h-full pt-5 sm:pt-16 lg:pt-12">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
