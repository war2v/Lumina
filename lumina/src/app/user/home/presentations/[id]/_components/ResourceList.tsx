import { PresentationResourceType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

interface ResourceListProps {
    resources: any[],
}
const ResourceList = ({resources}: ResourceListProps) => {
    if (!resources){
      return <Card>
        <CardHeader>
          <CardTitle>All Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
         <h1>No Resources</h1>
        </CardContent>
      </Card>
    }

    return ( 
        <Card>
        <CardHeader>
          <CardTitle>All Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {
            resources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded bg-muted">
              <span>{resource.file_name}</span>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
     );
}
 
export default ResourceList;