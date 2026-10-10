'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Home, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shadow-2xl shadow-red-900/30">
        <Flame className="w-10 h-10 animate-bounce" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-red-500">
          404 — Page Not Found
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Lost Your Craving?
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
          The page you are looking for has been eaten or doesn't exist. Head back to our hot kitchen!
        </p>
      </div>

      <div className="pt-2 flex flex-wrap gap-3 justify-center">
        <Link href="/">
          <Button variant="primary" size="lg">
            <Home className="w-4 h-4 mr-1.5" />
            Back to Home
          </Button>
        </Link>
        <Link href="/menu">
          <Button variant="secondary" size="lg">
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
