"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CurrentResourceProps {
    resources: any;
}
const CurrentResource = ({resources}: CurrentResourceProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentResource = resources[currentIndex];

    

    const renderResource = () => {
        switch (currentResource.type) {
        case 'image':
            return (
            <Image
                src={currentResource.url}
                alt={currentResource.name}
                width={800}
                height={600}
                className="rounded border"
            />
            );
        case 'pdf':
            return (
            <iframe
                src={currentResource.url}
                title={currentResource.name}
                className="w-full h-[600px] rounded border"
            />
            );
        default:
            return <p className="text-muted-foreground">Cannot preview this file type.</p>;
        }
    };

    return ( 
        <Card>
        <CardHeader>
          <CardTitle>Current Resource</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center justify-center">
          {renderResource()}
          <div className="flex items-center justify-between w-full mt-4">
            <Button
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              variant="outline"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <p className="text-sm text-muted-foreground">
              {currentIndex + 1} of {resources.length}
            </p>
            <Button
              onClick={() =>
                setCurrentIndex((prev) =>
                  Math.min(prev + 1, resources.length - 1)
                )
              }
              disabled={currentIndex === resources.length - 1}
              variant="outline"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

     );
}
 
export default CurrentResource;