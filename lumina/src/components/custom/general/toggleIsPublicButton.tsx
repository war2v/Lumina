'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toggleIsPublic } from '@/app/actions/toggleIsPublic';

export default function ToggleIsPublicButton({
  initialState,
  presentationId,
}: {
  initialState: boolean;
  presentationId: string;
}) {
  const [isPublic, setIsPublic] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const newState = await toggleIsPublic(presentationId, isPublic);
      setIsPublic(newState);
    } catch (err) {
      console.error('Failed to toggle active state:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button size='sm' onClick={handleClick} disabled={isLoading} className={isPublic ? 'bg-green-400 hover:bg-green-300' : ''} variant={isPublic ? 'default' : 'destructive'}>
      {isLoading
        ? 'Processing...'
        : isPublic
        ? 'Public'
        : 'Private'}
    </Button>
  );
}
