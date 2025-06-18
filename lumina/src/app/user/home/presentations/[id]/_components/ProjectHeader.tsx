"use client";

import { PresentationType } from "@/app/types";
import { Button } from "@/components/ui/button";
import EditPresentationModal from "@/components/ui/custom/Modals/EditPresentationModal";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import TogglePresentationButton from "./togglePresentationButton";

interface HeaderProps {
    presentation: PresentationType;
}

const Header = ({presentation}: HeaderProps) => {
    const [open, setOpen] = useState(false);
    return ( 
      
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{presentation.title}</h1>
            <div className="flex gap-2">
                
                <Button variant={"outline"} onClick={() => setOpen(true)}><Pencil/>Edit</Button>
                <EditPresentationModal
                    open={open}
                    onOpenChange={setOpen}
                    presentationId={presentation.id}
                    initialData={{ title: presentation.title, description: presentation.description }}
                />
                <TogglePresentationButton
                    initialState={presentation.active}
                    presentationId={presentation.id}
                />
                
            </div>
        </div>
       
     );
}
 
export default Header;