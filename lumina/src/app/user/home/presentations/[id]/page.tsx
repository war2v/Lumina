import AnalyticsCard from './_components/AnalyticsCard';
import Header from './_components/ProjectHeader';
import CurrentResource from './_components/CurrentResource';
import Description from './_components/Description';
import ShareLink from './_components/ShareLink';
import ResourceList from './_components/ResourceList';
import { redirect } from 'next/navigation';
import { getUserPresentationsById } from '@/app/queries/server/getUserPresentationById';
import { PresentationType } from '@/app/types';
import { getResourcesById } from '@/app/queries/server/getResources';


export default async function PresentationPage({params}:{params: Promise<{id: string}>
}) {
  const { id } = await params;
  const {active, created_at, created_by, description, is_public, title} = await getUserPresentationsById(id); 
  const resources = [{}]//await getResourcesById(id);

  if (!resources) {
    const resources = []
  }


  

  

  return (
    <div className="p-6 space-y-6 ">
      {/* Header */}
      <Header title={title} />
      {/* Current Slide/Resource Preview */}
      <CurrentResource resources={resources} />

      {/* Description */}
      <Description description={description} />

      {/* Analytics */}
      <AnalyticsCard />

      {/* Share Link */}
      <ShareLink shareLink={`${id}`}/>


      {/* All Resources List */}
      <ResourceList resources={resources}/>
    </div>
  );
}
