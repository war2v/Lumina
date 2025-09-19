"use client";
import { Presentation } from "@/app/types";
import { Container } from "@/components/custom/general/Contatiner";
import PresentationList from "@/components/custom/general/PresentationList"
import SearchBar from "@/components/custom/general/SearchBar"
import { useState } from "react";

interface FindContentProps {
  presentations: Presentation[] | null;
}

export const FindContent = ({ presentations }: FindContentProps) => {
    const [query, setQuery] = useState("");
    
    const filtered = presentations?.filter(p =>
        p.title?.toLowerCase().includes(query.toLowerCase())
    )

    return (
    <Container className="p-4">
        <div className="text-2xl text-red-300">Find</div>
        <SearchBar query={query} onChange={setQuery} />
        <div className="h-full overflow-scroll">
            <PresentationList presentations={filtered} className="h-full max-h-[1000px]"/>
        </div>
        
      
    </Container>
    )
}