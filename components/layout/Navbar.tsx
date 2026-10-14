'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Sparkles, Search } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state: any) => state.items || []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted 
    ? items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0) 
    : 0;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E5E0D8]">
      {/* Top Announcement Bar */}
      <div className="bg-[#1A1A1A] text-[#FAF8F5] text-xs py-2 px-4 text-center tracking-widest uppercase flex items-center justify-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C4A482]" />
        <span>Complimentary Carbon-Neutral Shipping on orders over $50</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#1A1A1A] hover:text-[#C4A482]"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-[#1A1A1A]">
          <Link href="/" className="hover:text-[#C4A482] transition-colors">Shop All</Link>
          <a href="#bestsellers" className="hover:text-[#C4A482] transition-colors">Skincare</a>
          <a href="#bestsellers" className="hover:text-[#C4A482] transition-colors">Haircare</a>
          <Link href="/quiz" className="flex items-center space-x-1.5 text-[#7A6248] hover:text-[#5C4936] font-semibold transition-colors">
            <Sparkles className="w-4 h-4" />
            <span>Routine Quiz</span>
          </Link>
        </nav>

        {/* Brand Logo */}
        <div className="text-center">
          <Link href="/" className="font-serif text-3xl sm:text-4xl tracking-widest text-[#1A1A1A]">
            LUMIÈRE
          </Link>
        </div>

        {/* Right Icons: Search & Cart */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-[#1A1A1A] hover:text-[#C4A482] transition-colors" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          
          <div className="relative p-2 text-[#1A1A1A] hover:text-[#C4A482] transition-colors cursor-pointer">
            <ShoppingBag className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#1A1A1A] text-[#FAF8F5] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E5E0D8] px-6 py-6 space-y-4">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-[#1A1A1A]">Shop All</Link>
          <a href="#bestsellers" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-[#1A1A1A]">Skincare</a>
          <Link href="/quiz" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-[#7A6248]">Take Routine Quiz</Link>
        </div>
      )}
    </header>
  );
}