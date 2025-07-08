"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LinkIcon } from "lucide-react";
import { useState } from "react";

interface ShareLinkProps {
    shareLink: string
}

const ShareLink = ({shareLink}: ShareLinkProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return ( 
        <Card>
        <CardHeader>
          <CardTitle>Audience Link</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 items-center">
          <Input value={shareLink} readOnly />
          <Button onClick={handleCopy}>
            <LinkIcon className="mr-1 h-4 w-4" />
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </CardContent>
      </Card>
     );
}
 
export default ShareLink;