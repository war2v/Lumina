import { getAllPresentations } from "@/app/queries/server/getAllPresentations";
import PresentationList from "@/components/custom/general/PresentationList";
import SearchBar from "@/components/custom/general/SearchBar";

export default async function SearchPage() {
  const presentations = await getAllPresentations();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      
      <SearchBar />
     <PresentationList presentations={presentations} />
      
    </div>
  );
}
