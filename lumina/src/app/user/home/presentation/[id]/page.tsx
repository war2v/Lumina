import { redirect, useParams } from "next/navigation";
import { getPresentationById } from "@/app/queries/server/getPresentationById";
import { getPresentationResources } from "@/hooks/usePresentationResources";
import CurrentResource from "@/components/custom/general/CurrentResource";
import ResourceList from "@/components/custom/general/ResourceList";
import CurrentResourceViewer from "@/components/custom/general/CurrentResourceViewer";
import { getCurrentResourceId } from "@/app/queries/server/getCurrentResourceId";
import CurrentLocalResource from "@/components/custom/general/CurrentLocalResource";

const ViewerPresentationPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: { code?: string };
}) => {
  const { id } = await params;
  const { code:providedCode } = await searchParams;

  if (!id) {
    redirect("/");
  }
  const presentation = await getPresentationById(id.toString());
  const resources = await getPresentationResources(id.toString());
  const current_resource_id = await getCurrentResourceId(id);

  if (
    !presentation.active ||
    (!presentation.is_public && presentation.invite_code !== providedCode)
  ) {
    console.log("unauthorized");
    redirect("/");
  }

  return (
    <div className="flex flex-col">
      <h1>presentation page for presentation: {presentation.id}</h1>
      <h1>{presentation.title}</h1>
      <h1>{presentation.created_by_username}</h1>
      <h1>{presentation.description}</h1>
      <CurrentResourceViewer
        resources={resources}
        current_resource_id={current_resource_id}
        presentation_id={presentation.id}
      />
      <CurrentLocalResource
        resources={resources}
        current_resource_id={current_resource_id}
        presentation_id={presentation.id}
      />
      <ResourceList resources={resources} />
    </div>
  );
};

export default ViewerPresentationPage;
