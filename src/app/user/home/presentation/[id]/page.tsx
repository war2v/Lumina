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
  params: { id: string };
  searchParams: { code?: string };
}) => {
  const { id } = params;
  const { code: providedCode } = searchParams;

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
    <Container className="gap-y-4 p-4 w-full">
      <div className="flex flex-col justify-between  px-3 text-muted-foreground font-semibold">
        <h1 className="text-2xl dark:text-white">{presentation.title}</h1>
        <h1 className="text-sm">{presentation.created_by_username}</h1>
        <h1 className="text-sm">{presentation.description}</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 h-full w-full">
          
          <div className="h-[730px] w-full">
            <NoteEditor className="h-full" initialValue={userNote.content} />
          </div>
          <div className="grid h-[600px] lg:grid-cols-1  gap-x-4 md:gap-y-4">
            <AttendeeSwitcher r_className="h-[600px]" resources={resources} id={current_resource_id} projectId={presentation.id} />
          </div>
          
        </div>
        <div className="w-full py-4">
            <ResourceList className="w-full" resources={resources} />
          </div>
    </Container>
  );
};

export default ViewerPresentationPage;
