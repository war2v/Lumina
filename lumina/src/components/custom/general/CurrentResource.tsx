"use client";
import { PresentationResourceType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import PDFViewer from "./PDFviewer";
import { setCurrentResource } from "@/app/actions/setCurrentResource";
import { useRouter } from "next/navigation";

interface CurrentResourceProps {
  resources: any[];
  id: string;
  projectId: string;
}
const CurrentResource = ({
  resources,
  id,
  projectId,
}: CurrentResourceProps) => {
  if (!resources) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Resource</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center justify-center">
          No Resources
        </CardContent>
      </Card>
    );
  }

  const router = useRouter();
  const currentResource = resources[Number(id)];

  console.log(id, resources.length);

  const incrementCurrentResourceItem = () => {
    if (Number(id) === resources.length - 1) {
      setCurrentResource("0", projectId);
    } else {
      setCurrentResource((Number(id) + 1).toString(), projectId);
    }
    router.refresh()
  };

  const decrementCurrentResourceItem = () => {
    if (Number(id) === 0) {
      setCurrentResource((resources.length - 1).toString(), projectId);
    } else {
      setCurrentResource((Number(id) - 1).toString(), projectId);
    }
    router.refresh()
  };

  const renderResource = () => {
    if (currentResource) {
      switch (currentResource.file_type) {
        case "image/jpeg":
          return (
            <Image
              src={
                process.env.NEXT_PUBLIC_SUPABASE_PRESENTATION_RESOURCES_URL +
                currentResource.file_path
              }
              alt={currentResource.file_name}
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
                currentResource.file_path
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
        <CardTitle>Current Resource{id}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-center justify-center">
        {renderResource()}
        <div className="flex items-center justify-between w-full mt-4">
          <Button
            onClick={decrementCurrentResourceItem}
            disabled={Number(id) === 0 || resources.length == 0}
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <p className="text-sm text-muted-foreground">
            {resources.length == 0 ? Number(id) : Number(id) + 1} of{" "}
            {resources.length}
          </p>

          <Button
            onClick={incrementCurrentResourceItem}
            disabled={
              Number(id) === resources.length - 1 || resources.length == 0
            }
            variant="outline"
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentResource;
