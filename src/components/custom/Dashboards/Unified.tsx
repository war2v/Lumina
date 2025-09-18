import { SearchComponent } from "../myPresentationDashboard/SearchComponent";
import { cn } from "@/lib/utils";
import { NotesContent } from "@/app/user/home/notes/content";
import PresentationCalendar from "../general/PresentationCalendar";
import { UserResourceList } from "../general/UserResourceList";
import { Note, Presentation, Resource } from "@/app/types";

interface Props {
  resources: Resource[] | null;
  presentations: Presentation[];
  className?: string;
  notes: Note[];
}

export const UnifiedDashboard = ({
  presentations,
  resources,
  className,
  notes,
}: Props) => {
  return (
    <main id="main" className={cn("h-full gap-4", className)}>
      <section
        id="presentation"
        className="p-2  rounded-xl mt-4 gap-x-2 gap-4 "
      >
        <div className="grid lg:grid-cols-2 md:grid-cols-1  gap-4">
          <div className="flex flex-col gap-4">
            <PresentationCalendar presentations={presentations} />
          </div>
          <div className="flex flex-col gap-4">
            <UserResourceList
              className="h-[500px]"
              presentations={presentations}
              resources={resources}
            />
            <SearchComponent
              className="bg-white shadow-md border-muted  p-2 rounded-lg"
              listClassName="border-transparent"
              presentations={presentations}
            />
            <NotesContent
              notes={notes}
              className="bg-white shadow-md border-muted  p-2 rounded-lg"
              listClassName="h-[300px] p-2 lg:grid-cols-1 lg:items-start"
            />
          </div>
        </div>
      </section>
    </main>
  );
};
