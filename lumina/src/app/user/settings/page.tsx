import { getUser } from "@/lib/supabase/getUserServer";
import Header from "../../../components/custom/general/header";
import UpdateUserForm from "../../../components/forms/UpdateUserForm";
import { Account, getAccount } from "@/lib/queries/server/getAccount";
import { redirect } from "next/navigation";


const SettingsPage = async () => {
  const { user } = await getUser();
  const account: Account | null = await getAccount();

  if(!user) {
    redirect("/login")
  }
  

  return (
    <div>
      <Header account={account}/>
      <div className="flex items-center justify-center w-full h-full mt-10">
        <UpdateUserForm user={user} account={account} />
      </div>
    </div>
  );
};

export default SettingsPage;
