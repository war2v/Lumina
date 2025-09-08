"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import CreatePresentationModal from "../Modals/CreatePresentationModal";
import { useState } from "react";
import AddResourceToPresentaitionModal from "../Modals/AddResourceToPresentationModal";
import DeleteResourceModal from "../Modals/DeleteResourceModal";
import CreateResourceModal from "../Modals/CreateResourceModal";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  resources: any[] | null;
  presentations: any[] | null;
}

export const UserResourceList = ({ className ,resources, presentations }: Props) => {
  if(resources){
    if (resources.length < 50) {
      for (let i = resources.length; i < 50; i++) resources.push({ id: "" });
    }
  }
  const [openCreate, setOpenCreatePresentation] = useState(false);
  const [openCreateResource, setOpenCreateResource] = useState(false);
  const [openLinkResource, setLinkResource] = useState(false);
  const [resourceId, setResourceId] = useState("0");
  const [openDeleteResource, setOpenDeleteResource] = useState(false);
  ////console.log(resources)

  return (
    <div className={cn("h-full shadow-lg rounded-lg dark:bg-black bg-white p-6 flex flex-col items-center", className)}>
      <div className="flex m-2 mb-4 gap-x-2 justify-center items-center">
        <Button
          onClick={() => setOpenCreatePresentation(true)}
          variant="outline"
          className="border-yellow-300"
        >
          Quick Create Presentation
        </Button>
        <Button
          onClick={() => setOpenCreateResource(true)}
          variant="outline"
          className="border-yellow-300"
        >
          Quick Create Resource
        </Button>
      </div>
      <div className="rounded-lg w-full lg:h-[800px] md:h-[500px]  overflow-scroll flex flex-col">
        {resources?.map((resource, index) => (
          <div
            key={index}
            className={`grid grid-cols-4 p-2 gap-y-2 justify-center items-center ${
              index % 2 === 0 ? "dark:bg-gray-900 bg-gray-100" : "dark:bg-black bg-white"
            }`}
          >
            <h1 className="overflow-auto truncate border-r border-gray-200">
              {resource.id}
            </h1>
            <h1 className="overflow-auto truncate border-r border-gray-200">
              {resource.file_name}
            </h1>
            <h1 className="overflow-auto truncate border-r border-gray-200">
              {resource.file_type}
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex justify-center items-center ${
                  resource.id === "" ? "hidden" : ""
                }`}
              >
                <MenuIcon className="hover:border-yellow-200  border-transparent" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col justify-center items-center gap-y-2 bg-gray-200 p-4 border-black border rounded-lg">
                <DropdownMenuItem>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setResourceId(resource.id);
                      setLinkResource(true);
                    }}
                  >
                    Add to Presentation
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setResourceId(resource.id);
                      setOpenDeleteResource(true);
                    }}
                  >
                    Delete Resource
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
      <CreatePresentationModal
        open={openCreate}
        onOpenChange={setOpenCreatePresentation}
      />
      <AddResourceToPresentaitionModal
        resource_id={resourceId}
        presentations={presentations}
        open={openLinkResource}
        onOpenChange={setLinkResource}
      />
      <DeleteResourceModal
        id={resourceId}
        open={openDeleteResource}
        onOpenChange={setOpenDeleteResource}
      />
      <CreateResourceModal
        open={openCreateResource}
        onOpenChange={setOpenCreateResource}
      />
    </div>
  );
};
