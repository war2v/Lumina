"use client"
import { download } from "@/app/actions/downloadFile";
import { PresentationResourceType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

interface ResourceListProps {
    resources: PresentationResourceType[],
}
const ResourceList = ({resources}: ResourceListProps) => {

  const handleDownload = async (url: string, file_name: string) => {
    const {data, error} = await download(url, file_name)
    if(error || data == null){
      return
    }

    const new_url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = new_url;
    a.download = "report.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(new_url);
  };

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
              <Button onClick={() => handleDownload(resource.file_path, resource.file_name)} variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
     );
}
 
export default ResourceList;