import AnalyticsCard from "@/components/custom/general/AnalyticsCard";
import Header from "@/components/custom/general/ProjectHeader";
import Description from "@/components/custom/general/Description";
import ResourceList from "@/components/custom/general/ResourceList";
import { getUserPresentationsById } from "@/lib/queries/server/getUserPresentationById";
import { Presentation } from "@/app/types";
import { getResourcesById } from "@/lib/queries/server/getResources";
import { Switcher } from "@/components/custom/general/Switcher";

export default async function PresentationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const {
    active,
    created_at,
    created_by,
    created_by_username,
    description,
    is_public,
    title,
    current_resource_id,
    invite_code,
    tags,
    start_datetime,
    end_datetime,
  } = await getUserPresentationsById(id);
  const presentatation: Presentation = {
    id,
    active,
    created_at,
    created_by,
    created_by_username,
    description,
    is_public,
    title,
    current_resource_id,
    invite_code,
    tags,
    start_datetime,
    end_datetime,
  };
  const resources = await getResourcesById(id);

  ////console.log(new Date(presentatation.start_datetime).toDateString());

  return (
    <div className="p-6 space-y-6 flex flex-col justify-center">
      {/* Header */}
      <Header presentation={presentatation} />

      <div className="grid lg:grid-cols-7 md:grid-cols-1 md:gap-y-2 h-full  justify-center w-full gap-x-2">
        <div className="col-span-3 h-full md:flex lg:hidden">
          <Switcher
            id={presentatation.current_resource_id ? presentatation.current_resource_id : "-1"}
            resources={resources}
            projectId={id}
            joinCode={presentatation.invite_code ? presentatation.invite_code : ""}
          />
        </div>
        <div className="flex flex-col gap-y-2 col-span-2">
          <Description
            description={description}
            tags={tags}
            date={start_datetime}
            endDate={end_datetime}
            shareLink={`${presentatation.invite_code}`}
            id={id}
          />
          <ResourceList
            className="h-[263px] overflow-hidden"
            rl_className="h-[260px] overflow-scroll mb-2"
            resources={resources}
          />
        </div>

        {/* Current Slide/Resource Preview */}
        <div className="col-span-3 h-full md:hidden lg:flex">
          <Switcher
            id={presentatation.current_resource_id ? presentatation.current_resource_id : "-1"}
            resources={resources}
            projectId={id}
            joinCode={presentatation.invite_code ? presentatation.invite_code : ""}
          />
        </div>
        <div className="col-span-2">
          <AnalyticsCard />
        </div>
      </div>
    </div>
  );
}
