'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { togglePresentationActive } from '@/app/actions/toggleActivePresentation';

export default function TogglePresentationButton({
  initialState,
  presentationId,
}: {
  initialState: boolean;
  presentationId: string;
}) {
  const [isActive, setIsActive] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const newState = await togglePresentationActive(presentationId, isActive);
      setIsActive(newState);
    } catch (err) {
      console.error('Failed to toggle active state:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button size='sm' onClick={handleClick} disabled={isLoading} variant={isActive ? 'destructive' : 'default'}>
      {isLoading
        ? 'Processing...'
        : isActive
        ? 'End Presentation'
        : 'Activate Presentation'}
    </Button>
  );
}
