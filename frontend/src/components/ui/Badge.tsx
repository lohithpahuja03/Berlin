import React from 'react';

export const VegBadge: React.FC = () => (
  <span className="inline-flex items-center justify-center w-4 h-4 border border-emerald-500 rounded-sm p-0.5 bg-emerald-950/40" title="Pure Vegetarian">
    <span className="w-2 h-2 rounded-full bg-emerald-500" />
  </span>
);

export const NonVegBadge: React.FC = () => (
  <span className="inline-flex items-center justify-center w-4 h-4 border border-red-500 rounded-sm p-0.5 bg-red-950/40" title="Non-Vegetarian">
    <span className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-red-500" />
  </span>
);

export const BestsellerBadge: React.FC = () => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
    ⭐ Best Seller
  </span>
);

export const NewBadge: React.FC = () => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-red-500/20 text-red-400 border border-red-500/30">
    🔥 New
  </span>
);
