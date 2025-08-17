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
import { renderResource } from "./renderResource";
import { QRJoinCode } from "./QRcode";

interface CurrentResourceProps {
  resources: any[];
  id: string;
  projectId: string;
  joinCode: string;
}
const CurrentResource = ({
  resources,
  id,
  projectId,
  joinCode,
}: CurrentResourceProps) => {
  if (!resources || resources.length === 0) {
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

  //console.log(id, resources.length);

  const incrementCurrentResourceItem = () => {
    if (Number(id) === resources.length - 1) {
      setCurrentResource("0", projectId);
    } else {
      setCurrentResource((Number(id) + 1).toString(), projectId);
    }
    router.refresh();
  };

  const decrementCurrentResourceItem = () => {
    if (Number(id) === 0) {
      setCurrentResource((resources.length - 1).toString(), projectId);
    } else {
      setCurrentResource((Number(id) - 1).toString(), projectId);
    }
    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Resource</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-center justify-center">
        <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-md overflow-hidden relative">
          {renderResource(currentResource)}

          <div className="absolute top-4 right-4 bg-white p-2 rounded-md shadow-md z-10">
            <QRJoinCode joinCode={joinCode} presentation_id={projectId} />
          </div>
        </div>
        <div className="flex items-center justify-between w-full mt-4">
          {resources.length > 0 ? (
            <>
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
            </>
          ) : (
            <></>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentResource;
