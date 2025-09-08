"use client";

import SimpleSearchBar from "@/components/custom/general/SimpleSearchBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/browserClient";
import { getUser } from "@/lib/supabase/getUserClient";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NotesContentProps {
  notes: any[];
  className?: string;
  listClassName?: string;
}

export const NotesContent = ({
  notes,
  className,
  listClassName,
}: NotesContentProps) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const filtered = notes

  //console.log(notes)
  const createNote = async () => {
    const supabase = await createClient();
    const { user } = await getUser();

    const { data, error } = await supabase
      .from("notes")
      .insert([{ user_id: user?.id }])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    ////console.log(data)
    router.push("/user/home/notes/" + data[0].id);
  };

  return (
    <div className={cn("w-full ", className)}>
      <div className="flex items-center rounded-lg rounded-b-none ">
        <Button size="sm" onClick={createNote}>
          Create Note
        </Button>
        <SimpleSearchBar
          text="Search Notes"
          className="flex justify-between w-full"
          query={query}
          onChange={setQuery}
        />
      </div>

      <div
        className={cn(
          "h-full max-h-[600px] rounded-lg rounded-t-none w-full grid lg:grid-cols-4 md:grid-cols-2 gap-2 overflow-scroll",
          listClassName
        )}
      >
        {filtered?.map((item: any, index: number) => (
          <Link
            href={`notes/${item.id}`}
            className="flex items-center justify-center"
            key={index}
          >
            <Card className="flex flex-col p-5 gap-y-2 w-full h-[100px] hover:border-red-400">
              <div className="flex">
                <p className="text-base text-primary">
                  {item?.presentations?.title ? item.presentations.title : ""}
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                {item?.content ? JSON.parse(item.content)?.content[0]?.content[0]?.text : "Empty"}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
