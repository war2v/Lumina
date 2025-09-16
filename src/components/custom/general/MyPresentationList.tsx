"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Edit } from "lucide-react";
import Link from "next/link";
import DeletePresentationModal from "../Modals/DeletePresentationModal";
import EditPresentationModal from "../Modals/EditPresentationModal";
import { useState } from "react";

interface PresentationListProps {
  presentations: any[] | null;
  className?: string;
  height?: number;
}
const MyPresentationList = ({ presentations, className, height = 300 }: PresentationListProps) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [linkResource, setLinkResource] = useState(false);
  const [presentationId, setPresentationId] = useState("");
  console.log( presentations ? presentations[Number(presentationId)]?.title : "")
  const setId = (index:Number) => {
    setPresentationId(index.toString()); 
    setOpen(true)
  }
  

  return (
    <div className={`w-full gap-y-2 flex flex-col h-[300px] p-4 overflow-scroll border-y ${className}`}>
      
      {presentations?.map((presentation, index) => (
        <div key={index}>
        
          <Card   className=" w-full h-full overflow-hidden border border-red-200 hover:border-red-300 transition">
            <CardHeader>
              <CardTitle className="text-base text-red-300">
                <h1 className="text-primary text-lg">
                  {presentation.title}
                </h1>
                </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground flex flex-col gap-y-2">
              <p className="text-sm text-muted-foreground font-bold flex gap-x-2">{presentation.start_datetime ? new Date(presentation.start_datetime).toDateString() : ""}
                    <span className="text-primary text-md">{presentation.start_datetime ? new Date(presentation.start_datetime).getHours()+":"+ new Date(presentation.start_datetime).getMinutes(): ""} - {presentation.end_datetime ? new Date(presentation.end_datetime).getHours()+":"+ new Date(presentation.end_datetime).getMinutes(): ""} 
                      </span>
              </p>
              
              <h1>{presentation.description}</h1>
              <div className="flex gap-x-2">
                <Badge className={`${presentation.active? "bg-success" : "bg-destructive"}`}>{presentation.active? "Active" : "Inactive"}</Badge>
                <Badge className={`${presentation.public? "bg-success" : "bg-destructive"}`}>{presentation.public? "Public" : "Private"}</Badge>
                <Button onClick={() => {setId(index)}}>
                  Edit <Edit/>
                </Button>
                <Link 
                  href={presentation.id ? `/user/home/mypresentations/${presentation.id}` : "#"}>
                
                  <Button className="text-foreground">
                    <ArrowRight />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
      <EditPresentationModal
        open={open}
        onOpenChange={setOpen}
        presentationId={presentationId}
        initialData={{
          title: "",
          description: "",
          tags: "",
        }}
      />

      <DeletePresentationModal
        id={presentationId}
        open={openDelete}
        onOpenChange={setOpenDelete}
      />
      
  
    </div>
  );
};

export default MyPresentationList;
