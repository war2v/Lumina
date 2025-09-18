import { cn } from "@/lib/utils"
import { SearchComponent } from "../myPresentationDashboard/SearchComponent"
import { useState } from "react";
import CreatePresentationModal from "../Modals/CreatePresentationModal";
import { UserResourceList } from "../general/UserResourceList";
import { Presentation, Resource } from "@/app/types";

export const PresenterDashboard = ({className, resources, presentations}: {className?: string, resources: Resource[] | null, presentations: Presentation[] | null}) => {
    const [createPresModal, openCreatePresModal] = useState(false);


    return (
        <main id="main" className={cn('h-full gap-4 grid md:grid-cols-1 lg:grid-cols-2 p-4', className)}>
            <section id="presentation" className="p-2  rounded-xl mt-4 gap-x-2 gap-4 ">
                <SearchComponent presentations={presentations} />
            </section>
            <section>
                <UserResourceList className="h-[500px]" resources={resources} presentations={presentations} />
            </section>
            <CreatePresentationModal open={createPresModal} onOpenChange={openCreatePresModal} />
                 
        </main>
    )
}