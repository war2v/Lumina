"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import PDFViewer from "./PDFviewer";
import { renderResource } from "./renderResource";
import { Resource } from "@/app/types";

interface CurrentResourceProps {
  resources: Resource[] | null;
  title: string;
  className?: string;
}
const CurrentLocalResource = ({
  resources,
  title,
  className
}: CurrentResourceProps) => {

   const [localId, setLocalId] = useState(0);
   
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

 

  const userCurrentResource = resources[localId];


  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className={`flex flex-col gap-4 items-center justify-center h-[600px] ${className}`}>
        <div className={`w-full h-full  flex items-center justify-center bg-gray-100 rounded-md overflow-hidden relative `}>
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
