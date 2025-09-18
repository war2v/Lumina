"use client"
import { useEffect, useRef, useState } from "react";
import CurrentResource from "./CurrentResource";
import NoteEditor from "./NoteEditor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FullscreenIcon, ImageIcon, NotebookIcon } from "lucide-react";
import { QRJoinCode } from "./QRcode";
import { Resource } from "@/app/types";

interface SwitcherProps {
  resources: Resource[] | null; 
  id: string;
  projectId: string;
  joinCode: string;
}

export const Switcher = ({resources, id, projectId, joinCode}: SwitcherProps) => {
    const [current, setCurrent] = useState("resources");
    const [isFullscreen, setIsFullscreen] = useState(false);
     const ref = useRef<HTMLDivElement>(null);


    const toggleFullscreen = async () => {
        if(!document.fullscreenElement) {
          await ref.current?.requestFullscreen();
          setIsFullscreen(true)
        } else {
          await document.exitFullscreen();
          setIsFullscreen(false)
        }
      }

    useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange)
  }, [])

    return (
        <div className="flex flex-col items-center w-full h-full">

            <Card ref={ref} className={`flex flex-col items-center max-w-[1000px] w-full p-4 h-full ${isFullscreen ? "bg-black" : ""}`}>
                <h1>Resource</h1>
                <div className="flex w-full gap-x-1 p-4 bg-opacity-5 bg-black mb-2 rounded-lg">
                    <Button
                        variant="editor"
                        size="sm"
                        onClick={() => setCurrent('resources')}
                    >
                        <ImageIcon/>
                    </Button>
                    <Button
                        variant="editor"
                        size="sm"
                        onClick={() => setCurrent('notes')}
                    >
                        <NotebookIcon/>
                    </Button>
                    <Button
                        variant="editor"
                        size="sm"
                        onClick={toggleFullscreen}
                        >
                        <FullscreenIcon/>
                    </Button>
                    <div className="flex w-full justify-end">
                        <QRJoinCode joinCode={joinCode} presentation_id={projectId} />
                    </div>
                </div>
                {
                current === "resources" ? 
                    <div className={`w-full h-full`}>
                        <CurrentResource className={`h-[500px] ${isFullscreen ? "h-screen" : ""}`}  resources={resources} id={id} projectId={projectId} />
                    </div>
                :
                    <div className={`h-[500px] w-full ${isFullscreen ? "h-full w-full" : ""}`}>
                        <NoteEditor className="h-full rounded-b-lg shadow-md" />
                    </div>
                }
            </Card>
        </div>
    );
}