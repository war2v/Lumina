import { getUserNotes } from "@/app/queries/server/getUserNotes";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/serverClient";
import { NotesContent } from "./content";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Container } from "@/components/custom/general/Contatiner";
import { Badge } from "@/components/ui/badge";

const NotesPage = async () => {
  const data = await getUserNotes();
  //console.log(data)
  return (
    <Container>
      
      <div className="w-full flex flex-col justify-center gap-4">
        <div className="flex flex-col">
          <div className="text-2xl text-red-300">
            <h1>My Notes</h1>
            <Badge>
              <h1 className="text-muted-foreground">My Notes</h1>
            </Badge>
          </div>
          
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-0 gap-4 ">
          {data?.map((item: any, index: number) => (
            <Link  href={`notes/${item.id}`} className="flex items-center justify-center" key={index}>
              <Card className="flex flex-col p-5 gap-y-2 w-full h-[150px] border border-transparent hover:border-red-400">
                <p className="text-base text-red-300">{item.presentations?.title}</p>
                <p className="text-muted-foreground">
                  {item.content ? item.content : "No Content"}
                </p>
              </Card>
            </Link>
          ))}
        </div>
        <div>
          <NotesContent />
        </div>
      </div>
    </Container>
  );
};

export default NotesPage;
