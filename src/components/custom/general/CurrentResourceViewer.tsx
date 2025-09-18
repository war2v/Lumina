"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtimeCurrentResource } from "@/hooks/useRealtimeCurrentResource";
import { renderResource } from "./renderResource";
import { Resource } from "@/app/types";

interface CurrentResourceProps {
  resources: Resource[] | null;
  presentation_id: string;
  current_resource_id: string;
  title: string;
  className?: string;
}
const CurrentResourceViewer = ({
  resources,
  presentation_id,
  current_resource_id,
  title,
  className,
}: CurrentResourceProps) => {
  const id = useRealtimeCurrentResource(presentation_id, current_resource_id);

  if (!resources) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center justify-center">
          No Resources
        </CardContent>
      </Card>
    );
  }

  //////console.log(id)
  const currentResource = resources[id];

  //////console.log(currentResource)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent
        className={`flex flex-col gap-4 items-center justify-center h-[600px] ${className}`}
      >
        <div
          className={`w-full h-full flex items-center justify-center bg-gray-100 rounded-md overflow-hidden relative ${className}`}
        >
          {renderResource(currentResource)}
        </div>
        <div className="flex items-center justify-center w-full mt-4">
          <p className="text-sm text-muted-foreground">
            {currentResource
              ? `${id} of ${resources.length}`
              : `0 of ${resources.length}`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentResourceViewer;
