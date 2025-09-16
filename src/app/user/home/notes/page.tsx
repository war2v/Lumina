import { getUserNotes } from "@/lib/queries/server/getUserNotes";
import { NotesContent } from "./content";
import { Container } from "@/components/custom/general/Contatiner";
import { Badge } from "@/components/ui/badge";

const NotesPage = async () => {
  const notes = await getUserNotes();
  ////console.log(data)
  return (
    <Container className="p-4">
      <div className=" w-full flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="text-2xl text-red-300 ">
            <Badge>
              <h1 className="text-muted-foreground">My Notes</h1>
            </Badge>
            <div className="flex gap-x-2 py-2">
              <NotesContent
                className="pt-2"
                listClassName="pt-2"
                notes={notes}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NotesPage;
