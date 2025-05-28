'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Download, LinkIcon, Trash, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import AnalyticsCard from './_components/AnalyticsCard';

export default function PresentationPage() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const presentation = {
    title: 'Sunday Sermon: The Power of Grace',
    description: 'Main points and scriptures for this week\'s message.',
    resources: [
      { name: 'Slides.pptx', type: 'file', url: '/slides.pptx' },
      { name: 'Sermon Notes.pdf', type: 'pdf', url: '/sermon-notes.pdf' },
      { name: 'Romans 8.png', type: 'image', url: '/romans8.png' },
    ],
    shareLink: `https://lumina.app/p/${id}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(presentation.shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentResource = presentation.resources[currentIndex];

  const renderResource = () => {
    switch (currentResource.type) {
      case 'image':
        return (
          <Image
            src={currentResource.url}
            alt={currentResource.name}
            width={800}
            height={600}
            className="rounded border"
          />
        );
      case 'pdf':
        return (
          <iframe
            src={currentResource.url}
            title={currentResource.name}
            className="w-full h-[600px] rounded border"
          />
        );
      default:
        return <p className="text-muted-foreground">Cannot preview this file type.</p>;
    }
  };

  return (
    <div className="p-6 space-y-6 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{presentation.title}</h1>
        <div className="flex gap-2">
          <Button variant="outline"><Pencil className="mr-1 h-4 w-4" /> Edit</Button>
          <Button variant="destructive"><Trash className="mr-1 h-4 w-4" /> End Presentation</Button>
        </div>
      </div>
      {/* Current Slide/Resource Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Current Resource</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center justify-center">
          {renderResource()}
          <div className="flex items-center justify-between w-full mt-4">
            <Button
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              variant="outline"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <p className="text-sm text-muted-foreground">
              {currentIndex + 1} of {presentation.resources.length}
            </p>
            <Button
              onClick={() =>
                setCurrentIndex((prev) =>
                  Math.min(prev + 1, presentation.resources.length - 1)
                )
              }
              disabled={currentIndex === presentation.resources.length - 1}
              variant="outline"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>


      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{presentation.description}</p>
        </CardContent>
      </Card>

      {/* Analytics */}
      <AnalyticsCard />

      {/* Share Link */}
      <Card>
        <CardHeader>
          <CardTitle>Audience Link</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 items-center">
          <Input value={presentation.shareLink} readOnly />
          <Button onClick={handleCopy}>
            <LinkIcon className="mr-1 h-4 w-4" />
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </CardContent>
      </Card>


      {/* All Resources List */}
      <Card>
        <CardHeader>
          <CardTitle>All Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {presentation.resources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded bg-muted">
              <span>{resource.name}</span>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
