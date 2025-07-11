import { redirect, useParams } from "next/navigation"
import { getPresentationById } from "@/app/queries/server/getPresentationById";
import { getPresentationResources } from "@/hooks/usePresentationResources";
import CurrentResource from "@/components/custom/general/CurrentResource";
import ResourceList from "@/components/custom/general/ResourceList";
import CurrentResourceViewer from "@/components/custom/general/CurrentResourceViewer";
import { getCurrentResourceId } from "@/app/queries/server/getCurrentResourceId";

const ViewerPresentationPage = async ({params}:{params: Promise<{id: string}>
}) => {
    const { id } = await params;

    if (!id){
        redirect('/')
    }
    const presentation = await getPresentationById(id.toString())
    const resources = await getPresentationResources(id.toString());
    const current_resource_id  = await getCurrentResourceId(id);


    

    return ( 
        <div className="flex flex-col">
            <h1>presentation page for presentation: { presentation.id}</h1>
            <h1>{presentation.title}</h1>
            <h1>{presentation.created_by_username}</h1>
            <h1>{presentation.description}</h1>
            <CurrentResourceViewer resources={resources} current_resource_id={current_resource_id} presentation_id={presentation.id}/>
            <ResourceList resources={resources}/>
        </div>
     );
}
 
export default ViewerPresentationPage;