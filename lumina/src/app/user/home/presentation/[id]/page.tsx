import { redirect, useParams } from "next/navigation";
import { getPresentationById } from "@/app/queries/server/getPresentationById";
import { getPresentationResources } from "@/hooks/usePresentationResources";
import CurrentResource from "@/components/custom/general/CurrentResource";
import ResourceList from "@/components/custom/general/ResourceList";
import CurrentResourceViewer from "@/components/custom/general/CurrentResourceViewer";
import { getCurrentResourceId } from "@/app/queries/server/getCurrentResourceId";
import CurrentLocalResource from "@/components/custom/general/CurrentLocalResource";
import { ensureUserNote } from "@/app/queries/server/ensureUserNote";
import NoteEditor from "@/components/custom/general/NoteEditor";
import { handleSave } from "@/app/actions/handleNoteSave";
import { createClient } from "@/lib/supabase/serverClient";

const ViewerPresentationPage = async ({ params, searchParams}: { params: Promise<{ id: string }>; searchParams: { code?: string };}) => {
  const { id } = await params;
  const { code:providedCode } = await searchParams;

  

  const presentation = await getPresentationById(id.toString());
  const resources = await getPresentationResources(id.toString());
  const current_resource_id = await getCurrentResourceId(id);
  const userNote = await ensureUserNote(id);
  console.log();
  
  if (
    !presentation.active ||
    (!presentation.is_public && presentation.invite_code !== providedCode)
  ) {
    //console.log("unauthorized");
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col justify-between py-5 px-3 text-muted-foreground font-semibold">
        <h1 className="text-2xl dark:text-white">{presentation.title}</h1>
        <h1 className="text-sm">{presentation.created_by_username}</h1>
        <h1 className="text-sm">{presentation.description}</h1>
      </div>
      <div className="grid lg:grid-cols-2 gap-x-4">
        
        <CurrentResourceViewer
        title="Presenter"
        resources={resources}
        current_resource_id={current_resource_id}
        presentation_id={presentation.id}
        />
        <CurrentLocalResource
          title="User"
          resources={resources}
          current_resource_id={current_resource_id}
          presentation_id={presentation.id}
        />
      </div>
      <NoteEditor initialValue={userNote.content}  />
      <ResourceList resources={resources} />
      
    </div>
  );
};

export default ViewerPresentationPage;
