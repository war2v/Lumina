import { createClient } from "@/lib/supabase/serverClient";
import SignInForm from "../_components/SignInForm";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/user/home");
  }

  return (
    <div className=" py-5 sm:py-16 lg:py-12">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
