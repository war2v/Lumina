"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { setCurrentResource } from "@/lib/actions/setCurrentResource";
import { useRouter } from "next/navigation";
import { renderResource } from "./renderResource";
import { Resource } from "@/app/types";


interface CurrentResourceProps {
  resources: Resource[] | null; 
  id: string;
  projectId: string;
  className?: string;
}
const CurrentResource = ({
  resources,
  id,
  projectId,
  className,
}: CurrentResourceProps) => {

  const router = useRouter();
 

  

  const incrementCurrentResourceItem = () => {
    if(resources){
      if (Number(id) === resources.length - 1) {
        setCurrentResource("0", projectId);
      } else {
        setCurrentResource((Number(id) + 1).toString(), projectId);
      }
      router.refresh();
      }
  };

  const decrementCurrentResourceItem = () => {
    if(resources){
      if (Number(id) === 0) {
        setCurrentResource((resources.length - 1).toString(), projectId);
      } else {
        setCurrentResource((Number(id) - 1).toString(), projectId);
      }
      router.refresh();
    }
  };

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

   const currentResource = resources[Number(id)];
 
  

  


  

  return (
    <div className={`w-full ${className}`}>
      <div className="flex h-4/5 flex-col gap-4 items-center justify-center">
        <div className="w-full h-full flex items-center justify-center rounded-md overflow-hidden relative">
          <div>{renderResource(currentResource)}</div>
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
      </div>
    </div>
  );
};

export default CurrentResource;
