"use client";

import { PresentationType } from "@/app/types";
import { Button } from "@/components/ui/button";
import EditPresentationModal from "@/components/custom/Modals/EditPresentationModal";
import { Link2,  Pencil, Trash } from "lucide-react";
import { useState } from "react";
import TogglePresentationButton from "./togglePresentationButton";
import ToggleIsPublicButton from "./toggleIsPublicButton";
import DeletePresentationModal from "../Modals/DeletePresentationModal";
import LinkResourceModal from "../Modals/LinkResourceModal";
import { getResourcesById } from "@/lib/queries/client/getResources";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface HeaderProps {
  presentation: PresentationType;
}

const Header = ({ presentation }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [linkResource, setLinkResource] = useState(false);
  const [resources, setResources] = useState<any[] | null>();

  const openLinkResource = async () => {
    const resource = await getResourcesById(presentation.id);
    setResources(resource);
    setLinkResource(true);
  };

  return (
    <div className="flex items-center justify-between bg-black p-4 bg-opacity-5 rounded-lg">
      <h1 className="text-2xl text-muted-foreground font-semi">
        {presentation.title}
      </h1>
      <div className="flex gap-2">
        <HoverCard>
          <HoverCardTrigger>
            <Button size="sm" variant="editor" onClick={openLinkResource}>
              <Link2 />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>Link Resource</HoverCardContent>
        </HoverCard>

        <Button size="sm" variant={"editor"} onClick={() => setOpen(true)}>
          <Pencil />
          Edit
        </Button>
        <TogglePresentationButton
          initialState={presentation.active}
          presentationId={presentation.id}
        />
        <ToggleIsPublicButton
          initialState={presentation.is_public}
          presentationId={presentation.id}
        />
        <Button
                
          size="sm"
          variant="editor"
          className="bg-red-500"
          onClick={() => setOpenDelete(true)}
        >
          <span className="md:hidden lg:flex">Delete</span>
          <Trash />
        </Button>
        
        

        <EditPresentationModal
          open={open}
          onOpenChange={setOpen}
          presentationId={presentation.id}
          initialData={{
            title: presentation.title,
            description: presentation.description,
            tags: presentation.tags,
          }}
        />

        <DeletePresentationModal
          id={presentation.id}
          open={openDelete}
          onOpenChange={setOpenDelete}
        />
        
        <LinkResourceModal
          presentation_title={presentation.title}
          resources={resources}
          presentation_id={presentation.id}
          open={linkResource}
          onOpenChange={setLinkResource}
        />
      </div>
    </div>
  );
};

export default Header;
