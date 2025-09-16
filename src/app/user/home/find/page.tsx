import { FindContent } from "./FindContent";
import { getAllPresentationsNotUsers } from "@/lib/queries/server/getAllPresentationsNotUsers";

export default async function SearchPage() {
  const presentations = await getAllPresentationsNotUsers();
  ////console.log(presentations)
  return <FindContent presentations={presentations} />;
}
