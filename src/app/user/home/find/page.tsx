import { getUser } from "@/lib/supabase/getUserServer";
import { FindContent } from "./FindContent";
import { getAllPresentationsNotUsers } from "@/lib/queries/server/getAllPresentationsNotUsers";

export default async function SearchPage() {
  const {user} = await getUser()
  if(!user){
    return <div>No Presentation&apos;s</div>
  }
  const presentations = await getAllPresentationsNotUsers(user);
  return <FindContent presentations={presentations} />;
  
  ////console.log(presentations)
  

  
}
