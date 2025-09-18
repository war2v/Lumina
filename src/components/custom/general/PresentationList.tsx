"use client";
import { Presentation } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

interface PresentationListProps {
  presentations: Presentation[] | undefined;
  className?: string;
}
const PresentationList = ({
  presentations,
  className,
}: PresentationListProps) => {
  
  //console.log(presentations)

  return (
    <div
      className={`grid lg:grid-cols-1 gap-4 h-[500px] p-2 overflow-scroll ${className}`}
    >
      {presentations?.map((presentation, index) => (
        <Link
          href={`/user/home/presentation/${presentation.id}`}
          key={index}
          className={`w-full ${
            !presentation.is_public || !presentation.active ? "hidden" : ""
          }`}
        >
          <Card className=" w-full h-[150px] overflow-hidden border border-red-200 hover:border-red-300 transition">
            <CardHeader>
              <CardTitle className="text-base text-red-300">
                {presentation.title}
                <h1 className="text-muted-foreground text-sm">
                  {presentation.created_by_username}
                  {presentation.description}
                </h1>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div>
                <p className="text-sm text-muted-foreground font-bold flex gap-x-2">{presentation.start_datetime ? new Date(presentation.start_datetime).toDateString() : ""}
                    <span className={`text-primary text-md`}>{presentation.start_datetime ? new Date(presentation.start_datetime).getHours()+":"+ new Date(presentation.start_datetime).getMinutes(): ""} - {presentation.end_datetime ? new Date(presentation.end_datetime).getHours()+":"+ new Date(presentation.end_datetime).getMinutes(): ""} 
                      </span>
              </p>
              
              <h1></h1>
              </div>
              <div className="flex gap-x-2">
                <Badge className={`${presentation.active? "bg-success" : "bg-destructive"}`}>{presentation.active? "Active" : "Inactive"}</Badge>
                <Badge className={`${presentation.is_public? "bg-success" : "bg-destructive"}`}>{presentation.is_public? "Public" : "Private"}</Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default PresentationList;
