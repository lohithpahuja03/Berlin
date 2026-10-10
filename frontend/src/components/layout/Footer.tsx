import React from 'react';
import Link from 'next/link';
import { Flame, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#e50914] to-[#ff2b36] flex items-center justify-center shadow-lg shadow-red-600/30">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-wider text-white">BERLIN</span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Berlin is a modern fast-food dining and delivery experience. Smashed craft burgers, stone-baked sourdough pizzas, and fiery crispy chicken delivered fresh & piping hot in 25 minutes.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Certified Hygiene & Fresh Ingredients</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">Explore Menu</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/menu?category=burgers" className="hover:text-red-500 transition-colors">
                  Gourmet Smashed Burgers
                </Link>
              </li>
              <li>
                <Link href="/menu?category=pizzas" className="hover:text-red-500 transition-colors">
                  Stone-Baked Sourdough Pizzas
                </Link>
              </li>
              <li>
                <Link href="/menu?category=chicken" className="hover:text-red-500 transition-colors">
                  Crispy Spiced Chicken & Wings
                </Link>
              </li>
              <li>
                <Link href="/menu?category=fries" className="hover:text-red-500 transition-colors">
                  Peri-Peri Loaded Fries
                </Link>
              </li>
              <li>
                <Link href="/menu?category=combos" className="hover:text-red-500 transition-colors">
                  Berlin Feasts & Combos
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-red-500 font-semibold hover:text-red-400 transition-colors">
                  Special Offers & Coupons
                </Link>
              </li>
            </ul>
          </div>

          {/* Business & Hours */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">Kitchen Hours</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-zinc-200 font-medium">Daily Service:</p>
                  <p className="text-zinc-400">11:00 AM – 03:00 AM (Late Night)</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-zinc-200 font-medium">Flagship Kitchen:</p>
                  <p className="text-zinc-400">Alexanderplatz 7, Mitte / Cyber Hub Sector 29</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Contact */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">Order & Support</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-zinc-500" />
                <span className="text-zinc-300 font-medium">+91 (0) 11 4982 7700</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-zinc-500" />
                <span className="text-zinc-300">support@berlin.food</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[11px] font-semibold text-zinc-400 mb-2">Supported Payments:</p>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  Cash on Delivery (₹699–₹4,999)
                </span>
                <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-sky-400">
                  Paytm
                </span>
                <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-emerald-400">
                  Google Pay
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 BERLIN Fast-Food Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-zinc-300 transition-colors">Refund & Cancellation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
