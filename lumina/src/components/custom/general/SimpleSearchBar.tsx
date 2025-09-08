"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  query: string;
  onChange: Dispatch<SetStateAction<string>>;
  className?: string;
  text?: string;
}
const SimpleSearchBar = ({ query, onChange, className, text = 'Search...' }: SearchBarProps) => {
  return (
    <div className={cn(`flex gap-x-2 px-2`, className)}>
      <Input
        className="flex"
        placeholder={text}
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SimpleSearchBar;
