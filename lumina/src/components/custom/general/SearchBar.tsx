"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [joinCode, setJoinCode] = useState("");
  
    return ( 
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 space-y-4 sm:space-y-0">
            <Input
            className="flex-1"
            placeholder="Search presentations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <Button>Search</Button>
            <div className="flex items-center gap-2">
            <Input
                placeholder="Join code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="w-40"
            />
            <Button variant="outline">Join</Button>
            </div>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
            <Button variant="outline" size="sm">
            All
            </Button>
            <Button variant="outline" size="sm">
            Public
            </Button>
            <Button variant="outline" size="sm">
            Private
            </Button>
        </div>
      </div>
     );
}
 
export default SearchBar;