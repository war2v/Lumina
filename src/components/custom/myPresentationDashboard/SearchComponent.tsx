"use client"
import { useState } from "react"
import SimpleSearchBar from "../general/SimpleSearchBar"
import MyPresentationList from "../general/MyPresentationList"
import { cn } from "@/lib/tiptap-utils";



interface SearchComponentProps {
    presentations: any[] | null,
    className?: string;
    listClassName?: string;
}
export const SearchComponent = ({presentations, className, listClassName}: SearchComponentProps) => {
    const [query, setQuery] = useState<string>("");

    const filtered = presentations?.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className={cn("w-full", className)}>
            <SimpleSearchBar text="Search Presentation's"  query={query} onChange={setQuery} />
            <div>
                <MyPresentationList className={listClassName} presentations={filtered ? filtered : null}/>
            </div>

            
        </div>
    )
}