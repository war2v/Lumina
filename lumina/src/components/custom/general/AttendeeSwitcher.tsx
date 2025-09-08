"use client";
import { useEffect, useRef, useState } from "react";
import NoteEditor from "./NoteEditor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FullscreenIcon,
  ImageIcon,
  NotebookIcon,
  UserIcon,
} from "lucide-react";
import CurrentLocalResource from "./CurrentLocalResource";
import CurrentResourceViewer from "./CurrentResourceViewer";

interface SwitcherProps {
  resources: any[] | null;
  id: string;
  projectId: string;
  r_className?: string;
}

export const AttendeeSwitcher = ({
  resources,
  id,
  projectId,
  r_className,
}: SwitcherProps) => {
  const [current, setCurrent] = useState("resources");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await ref.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <Card
        ref={ref}
        className={`flex flex-col items-center  w-full p-4 h-full ${
          isFullscreen ? "bg-black" : ""
        }`}
      >
        <h1>Resource</h1>
        <div className="flex w-full gap-x-1 p-4 overflow-scroll bg-opacity-5 bg-black mb-2 rounded-lg">
          <Button
            variant="editor"
            size="sm"
            onClick={() => setCurrent("current")}
          >
            <ImageIcon />
          </Button>
          <Button
            variant="editor"
            size="sm"
            onClick={() => setCurrent("viewer")}
          >
            <UserIcon />
          </Button>
          <Button
            variant="editor"
            size="sm"
            onClick={() => setCurrent("notes")}
          >
            <NotebookIcon />
          </Button>

          <Button variant="editor" size="sm" onClick={toggleFullscreen}>
            <FullscreenIcon />
          </Button>
        </div>
        {current === "current" ? (
          <div className={`w-full h-[400px]`}>
            <CurrentResourceViewer
              className="h-[400]"
              title="Presenter"
              resources={resources}
              current_resource_id={id}
              presentation_id={projectId}
            />
          </div>
        ) : current === "viewer" ? (
          <div>
            <CurrentLocalResource
              className="h-[400px]"
              title="User"
              resources={resources}
              current_resource_id={id}
              presentation_id={projectId}
            />
          </div>
        ) : (
          <div
            className={`h-[400px] w-full ${
              isFullscreen ? "h-full w-full" : ""
            } ${r_className}`}
          >
            <NoteEditor className="h-full rounded-b-lg shadow-md" />
          </div>
        )}
      </Card>
    </div>
  );
};
