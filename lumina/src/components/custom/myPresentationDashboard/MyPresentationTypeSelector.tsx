"use client"
import { useState } from "react";
import MyPresentationList from "../general/MyPresentationList"
import { Button } from "@/components/ui/button";

interface SelectorProps {
    className?: string,
    public_presentations: any[] | null,
    private_presentations: any[] | null,
}

export const MyPresentationTypeSelector = ({className, public_presentations, private_presentations}: SelectorProps) => {
    const [public_type, setPublic] = useState<boolean>(true);
    return (
        <div className={`grid grid-cols-1 items-center justify-center w-full ${className}`}>
            <div className="flex justify-center">
                <Button 
                    variant="outline"
                    className={`rounded-r-none text-sm ${!public_type ? "opacity-50" : ""}` }
                    onClick={() => setPublic(true)}>
                    <h1>Public</h1>
                </Button>
                <Button 
                    variant="outline"
                    className={`rounded-l-none text-sm ${public_type ? "opacity-50" : ""}` }
                    onClick={() => setPublic(false)}
                    >
                    <h1>Private</h1>
                </Button>
            </div>
            {public_type ? (
                <div className="w-full flex flex-col justify-center items-center pt-2">
                    
                    <MyPresentationList presentations={public_presentations}  />
                </div>
            ) : (
                <div className="w-full flex flex-col justify-center items-center pt-2">
                    
                    <MyPresentationList presentations={private_presentations} />
                </div>
            )}
        </div>
    )
}