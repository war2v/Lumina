"use client";
import { PresentationResourceType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import PDFViewer from "./PDFviewer";
import { useRealtimeCurrentResource } from "@/hooks/useRealtimeCurrentResource";
import { renderResource } from "./renderResource";

interface CurrentResourceProps {
  resources: any[];
  presentation_id: string;
  current_resource_id: string;
  title: string;
}
const CurrentLocalResource = ({
  resources,
  title,
  presentation_id,
  current_resource_id,
}: CurrentResourceProps) => {
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

  const [localId, setLocalId] = useState(0);

  const userCurrentResource = resources[localId];

  const renderLocalResource = () => {
    if (userCurrentResource) {
      switch (userCurrentResource.file_type) {
        case "image/jpeg":
          return (
            <Image
              src={
                process.env.NEXT_PUBLIC_SUPABASE_PRESENTATION_RESOURCES_URL +
                userCurrentResource.file_path
              }
              alt={userCurrentResource.file_name}
              width={800}
              height={600}
              className="rounded border"
            />
          );
        case "application/pdf":
          return (
            <PDFViewer
              url={
                process.env.NEXT_PUBLIC_SUPABASE_PRESENTATION_RESOURCES_URL +
                userCurrentResource.file_path
              }
            />
          );
        default:
          return (
            <p className="text-muted-foreground">
              Cannot preview this file type.
            </p>
          );
      }
    }
    return (
      <p className="text-muted-foreground">Cannot preview this file type.</p>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-center justify-center">
        <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-md overflow-hidden relative">
          {renderResource(userCurrentResource)}
        </div>
        <div className="flex items-center justify-between w-full mt-4">
          <Button
            onClick={() => {
              localId - 1 < 0
                ? setLocalId(resources.length - 1)
                : setLocalId(localId - 1);
            }}
            type="button"
            size="lg"
          >
            Back
          </Button>
          <p className="text-sm text-muted-foreground">
            {userCurrentResource
              ? `${localId + 1} of ${resources.length}`
              : `0 of ${resources.length}`}
          </p>
          <Button
            onClick={() => {
              localId + 1 > resources.length - 1
                ? setLocalId(0)
                : setLocalId(localId + 1);
            }}
            type="button"
            size="lg"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentLocalResource;
