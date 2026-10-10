'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Captured by Berlin ErrorBoundary:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-5">
      <div className="w-16 h-16 rounded-3xl bg-red-950/60 border border-red-700/60 flex items-center justify-center text-red-500 shadow-xl">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-black text-white">Something went wrong!</h2>
        <p className="text-xs text-zinc-400 max-w-sm mx-auto">
          We encountered an unexpected error while preparing this screen. Don't worry, your cart is safe.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="primary" size="md" onClick={() => reset()}>
          <RotateCcw className="w-4 h-4 mr-1.5" />
          Try Again
        </Button>
        <Link href="/">
          <Button variant="secondary" size="md">
            <Home className="w-4 h-4 mr-1.5" />
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
