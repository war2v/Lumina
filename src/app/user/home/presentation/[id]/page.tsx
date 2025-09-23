import { redirect } from "next/navigation";
import { getPresentationById } from "@/lib/queries/server/getPresentationById";
import ResourceList from "@/components/custom/general/ResourceList";
import { getCurrentResourceId } from "@/lib/queries/server/getCurrentResourceId";
import { ensureUserNote } from "@/lib/queries/server/ensureUserNote";
import NoteEditor from "@/components/custom/general/NoteEditor";
import { getResourcesById } from "@/lib/queries/server/getResources";
import { Container } from "@/components/custom/general/Contatiner";
import { AttendeeSwitcher } from "@/components/custom/general/AttendeeSwitcher";

const ViewerPresentationPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ code?: string }>;
}) => {
  const { id } = await params;
  const { code: providedCode } = await searchParams;

  const presentation = await getPresentationById(id.toString());
  const resources = await getResourcesById(id.toString());
  const current_resource_id = await getCurrentResourceId(id);
  const userNote = await ensureUserNote(id);
  //console.log();

  if (
    !presentation.active ||
    (!presentation.is_public && presentation.invite_code !== providedCode)
  ) {
    ////console.log("unauthorized");
    redirect("/");
  }

  return (
    <Container className="flex flex-col gap-y-4 p-4 ">
      <div className="flex flex-col justify-between  px-3 text-muted-foreground font-semibold">
        <h1 className="text-2xl dark:text-white">{presentation.title}</h1>
        <h1 className="text-sm">{presentation.created_by_username}</h1>
        <h1 className="text-sm">{presentation.description}</h1>
      </div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 h-full w-full">
          
        
          <NoteEditor className="h-[600px] md:w-full w-[200px] " initialValue={userNote ? userNote.content : ""} />
        
        
          <AttendeeSwitcher r_className="h-[600px] sm:max-w-xs" resources={resources} id={current_resource_id} projectId={presentation.id} />
        
        
      </div>
      <div className="w-full py-4">
          <ResourceList className="w-full" resources={resources} />
        </div>
    </Container>
  );
};

export default ViewerPresentationPage;
