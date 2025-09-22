"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LinkIcon } from "lucide-react";
import { useState } from "react";

interface DescriptionProps {
    description?: string,
    tags?: string,
    date?: Date,
    endDate?: Date,
    id?: string;
    shareLink?: string;
}
const Description = ({description, tags, date, endDate, id, shareLink}: DescriptionProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_DOMAIN}user/presentation/${id}/${shareLink}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return ( 
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col pb-2 bg-opacity-5 bg-black p-2 rounded-lg">
                    <p className="text-xs text-foreground font-semibold">Description</p>
                    <p className="text-muted-foreground text-sm">{description}</p>
                </div>
                
                <div className="flex flex-col pb-2 bg-opacity-5 bg-black p-2 rounded-lg">
                    <p className="text-xs text-foreground font-semibold">Date</p>
                    <p className="text-sm text-muted-foreground">{date ? new Date(date).toDateString() : ""}</p>
                    <p className="text-sm text-muted-foreground"><span className="text-primary text-lg">{date ? new Date(date).getHours()+":"+ new Date(date).getMinutes(): ""} - {endDate ? new Date(endDate).getHours()+":"+ new Date(endDate).getMinutes(): ""} </span></p>
                </div>

                <div className="flex flex-col pb-2 bg-opacity-5 bg-black p-2 rounded-lg">
                    <p className="text-xs text-foreground font-semibold">Tags</p>
                    <p className="text-sm text-muted-foreground">{tags}</p>
                </div>
                
                <div className="flex flex-col pb-2 bg-opacity-5 bg-black p-2 rounded-lg">
                    <p className="text-xs text-foreground font-semibold">Invite Code</p>
                    <div className="flex">
                        <Input className="bg-background" value={shareLink} readOnly />
                        <Button onClick={handleCopy}>
                            <LinkIcon className="mr-1 h-4 w-4" />
                            {copied ? 'Copied!' : 'Copy Link'}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
     );
}
 
export default Description;