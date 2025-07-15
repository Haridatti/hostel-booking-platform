'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Preloader() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000); // Keep a minimum display time for the animation

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background transition-opacity duration-500',
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      )}
    >
      <div className="flex items-center justify-center space-x-2 mb-6">
        <div className="h-5 w-5 rounded-full bg-destructive animate-bubble-bounce [animation-delay:-0.3s]"></div>
        <div className="h-5 w-5 rounded-full bg-destructive animate-bubble-bounce [animation-delay:-0.15s]"></div>
        <div className="h-5 w-5 rounded-full bg-destructive animate-bubble-bounce"></div>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-destructive font-headline">Hostel Booking Platform</h1>
        <p className="text-muted-foreground">Loading your hostel platform...</p>
      </div>
    </div>
  );
}
