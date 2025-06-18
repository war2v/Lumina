"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [joinCode, setJoinCode] = useState("");

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Search Bar and Join Code */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 space-y-4 sm:space-y-0">
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

      {/* Filters Section */}
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

      {/* Search Results */}
      <div className="space-y-4">
        {[1, 2, 3].map((id) => (
          <Card key={id}>
            <CardHeader>
              <CardTitle className="text-base">
                Presentation Title {id}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              This is a short description of presentation {id}. You can include
              topics, date, or tags here.
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
