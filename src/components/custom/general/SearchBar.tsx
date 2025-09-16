"use client";
import { getPresentationByJoinCodeClient } from "@/lib/queries/client/getPresentationByJoinCodeClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface SearchBarProps {
  query: string;
  onChange: Dispatch<SetStateAction<string>>;
}
const SearchBar = ({ query, onChange }: SearchBarProps) => {
  const [joinCode, setJoinCode] = useState("");
  const router = useRouter();

  const tryJoin = async () => {
    const presentation = await getPresentationByJoinCodeClient(joinCode);
    if (presentation === "") {
      ////console.log("No Presentation")
      return;
    }

    router.push(
      `/user/home/presentation/${presentation.id}?code=${presentation.invite_code}`
    );
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 space-y-4 sm:space-y-0">
        <Input
          className="flex-1"
          placeholder="Search presentations..."
          value={query}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button>Search</Button>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Join code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            className="w-40"
          />
          <Button onClick={tryJoin} variant="outline">
            Join
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
