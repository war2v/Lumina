import AnalyticsCard from '@/components/custom/general/AnalyticsCard';
import Header from '@/components/custom/general/ProjectHeader';
import CurrentResource from '@/components/custom/general/CurrentResource';
import Description from '@/components/custom/general/Description';
import ShareLink from '@/components/custom/general/ShareLink';
import ResourceList from '@/components/custom/general/ResourceList';
import { getUserPresentationsById } from '@/app/queries/server/getUserPresentationById';
import { PresentationType } from '@/app/types';
import { getResourcesById } from '@/app/queries/server/getResources';
import { QRJoinCode } from '@/components/custom/general/QRcode';


export default async function PresentationPage({params}:{params: Promise<{id: string}>
}) {
  const { id } = await params;
  const {active, created_at, created_by, created_by_username, description, is_public, title, current_resource_id, invite_code} = await getUserPresentationsById(id); 
  const presentatation: PresentationType = {id, active, created_at, created_by, created_by_username, description, is_public, title, current_resource_id, invite_code}
  const resources = await getResourcesById(id);

  const current_resource = current_resource_id;
  
  console.log(invite_code)

  

  

  return (
    <div className="p-6 space-y-6 ">
      {/* Header */}
      <Header presentation={presentatation} />

      
      {/* Current Slide/Resource Preview */}
      <CurrentResource resources={resources} id={current_resource} projectId={id} joinCode={presentatation.invite_code}/>

      {/* Description */}
      <Description description={description} />

      {/* Analytics */}
      <AnalyticsCard />

      {/* Share Link */}
      <ShareLink shareLink={`localhost:3000/user/home/presentation/${id}?code=${presentatation.invite_code}`}/>


      {/* All Resources List */}
      <ResourceList resources={resources}/>
    </div>
  );
}
