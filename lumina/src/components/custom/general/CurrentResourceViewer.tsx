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
}
const CurrentResourceViewer = ({resources, presentation_id, current_resource_id}: CurrentResourceProps) => {
    if(!resources){
      return<Card>
        <CardHeader>
          <CardTitle>Current Resource</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center justify-center">
          No Resources
        </CardContent>
        </Card>
    }

    const [localId, setLocalId] = useState(0)

    

    const id = useRealtimeCurrentResource(presentation_id, current_resource_id)

    //console.log(id)
    const currentResource = resources[id]


    

    //console.log(currentResource)
    

    return ( 
        <Card>
        <CardHeader>
          <CardTitle>Current Resource</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center justify-center">
          {renderResource(currentResource)}
          <div className="flex items-center justify-center w-full mt-4">
            
            <p className="text-sm text-muted-foreground">
              {
              currentResource
                ? `${id} of ${resources.length}`
                : `0 of ${resources.length}`
              }
            </p>
          </div>

          
        </CardContent>
      </Card>

     );
}
 
export default CurrentResourceViewer;