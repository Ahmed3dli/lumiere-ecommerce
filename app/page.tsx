'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SlideOutCart from '@/components/cart/SlideOutCart';
import { useCartStore } from '@/lib/store/cartStore';
import { Sparkles, ShieldCheck, Leaf, Feather, Star, ArrowRight, Check } from 'lucide-react';

const FEATURED_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Hydra-Barrier Botanical Lotion',
    category: 'Skincare',
    price: 38.00,
    size: '100ml / 3.4 fl. oz.',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1608248597359-335688a23078?q=80&w=800&auto=format&fit=crop',
    tag: 'Bestseller'
  },
  {
    id: 'prod-002',
    name: 'Restorative Scalp & Hair Nectar',
    category: 'Haircare',
    price: 42.00,
    size: '50ml / 1.7 fl. oz.',
    rating: 5.0,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop',
    tag: 'Award Winner'
  },
  {
    id: 'prod-003',
    name: 'Dew-Finish Rose Lip & Cheek Glaze',
    category: 'Clean Makeup',
    price: 26.00,
    size: '15ml / 0.5 fl. oz.',
    rating: 4.8,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
    tag: 'New'
  },
  {
    id: 'prod-004',
    name: 'Calming Chamomile Body Elixir',
    category: 'Bodycare',
    price: 46.00,
    size: '200ml / 6.8 fl. oz.',
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    tag: 'Trending'
  }
];

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAdd = (product: any) => {
    addItem(product, 1);
    setAddedItem(product.id);
    setIsCartOpen(true);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-[#F4EFEA] py-20 lg:py-28 border-b border-[#E8E2D9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#EAE2D8] text-xs font-semibold uppercase tracking-widest text-[#7A6248]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Mindful Beauty Standard</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-tight">
                  Botanical Science Meets Mindful Rituals.
                </h1>
                <p className="text-lg text-[#666] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Clean, clinical-grade formulations crafted for your skin, scalp, and body. 100% cruelty-free, zero synthetic fragrance.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <a
                    href="#bestsellers"
                    className="w-full sm:w-auto px-8 py-4 bg-[#1A1A1A] text-[#FAF8F5] text-sm uppercase tracking-wider font-semibold rounded-md hover:bg-[#333] transition-all shadow-md text-center"
                  >
                    Shop Best Sellers
                  </a>
                  <Link
                    href="/quiz"
                    className="w-full sm:w-auto px-8 py-4 border border-[#1A1A1A] text-[#1A1A1A] text-sm uppercase tracking-wider font-semibold rounded-md hover:bg-[#EAE2D8] transition-all text-center"
                  >
                    Take Routine Quiz
                  </Link>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1200&auto=format&fit=crop"
                    alt="Lumière Selfcare Rituals"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST & CERTIFICATIONS RIBBON */}
        <section className="bg-white py-8 border-b border-[#E8E2D9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <Leaf className="w-6 h-6 text-[#7A6248]" />
                <span className="text-sm font-semibold tracking-wide">100% Vegan & Cruelty-Free</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <ShieldCheck className="w-6 h-6 text-[#7A6248]" />
                <span className="text-sm font-semibold tracking-wide">Dermatologist Formulated</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Feather className="w-6 h-6 text-[#7A6248]" />
                <span className="text-sm font-semibold tracking-wide">Sustainably Harvested</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Sparkles className="w-6 h-6 text-[#7A6248]" />
                <span className="text-sm font-semibold tracking-wide">Zero Synthetic Fragrance</span>
              </div>
            </div>
          </div>
        </section>

        {/* BESTSELLERS GRID */}
        <section id="bestsellers" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-widest text-[#7A6248] font-semibold mb-2">Curated Formulations</p>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A]">Most Loved Rituals</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl overflow-hidden border border-[#E8E2D9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-[#F4EFEA]">
                  <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded">
                    {product.tag}
                  </span>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-1 text-amber-500 text-xs mb-1.5">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-semibold text-neutral-800">{product.rating}</span>
                      <span className="text-neutral-400">({product.reviews})</span>
                    </div>
                    <span className="text-[11px] uppercase tracking-wider text-[#7A6248] font-bold">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg text-[#1A1A1A] mt-1 mb-1 group-hover:text-[#7A6248] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mb-4">{product.size}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#F0EBE3]">
                    <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="px-4 py-2 bg-[#1A1A1A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#7A6248] transition-colors flex items-center space-x-1"
                    >
                      {addedItem === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <span>Quick Add</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3-STEP RITUAL SPOTLIGHT */}
        <section className="bg-[#EFE8DF] py-20 border-y border-[#E0D7CC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
              <span className="text-xs uppercase tracking-widest text-[#7A6248] font-semibold">Effortless Radiance</span>
              <h2 className="text-3xl sm:text-4xl font-serif">The Daily 3-Step Reset</h2>
              <p className="text-neutral-600">Cleanse, hydrate, and protect with our signature botanical trinity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl border border-[#D8CFC3] text-center space-y-3">
                <span className="text-2xl font-serif text-[#7A6248]">01</span>
                <h4 className="font-serif text-xl">Purify & Clarify</h4>
                <p className="text-sm text-neutral-500">Gently melt away impurities without stripping natural lipid moisture.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-[#D8CFC3] text-center space-y-3">
                <span className="text-2xl font-serif text-[#7A6248]">02</span>
                <h4 className="font-serif text-xl">Hydrate & Infuse</h4>
                <p className="text-sm text-neutral-500">Multi-weight hyaluronic acid delivers 72-hour deep cell hydration.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-[#D8CFC3] text-center space-y-3">
                <span className="text-2xl font-serif text-[#7A6248]">03</span>
                <h4 className="font-serif text-xl">Seal & Glow</h4>
                <p className="text-sm text-neutral-500">Botanical squalane creates a protective silk barrier with dewy finish.</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/quiz"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-[#7A6248] text-white text-sm font-semibold uppercase tracking-wider rounded-md hover:bg-[#634E39] transition-all shadow-md"
              >
                <span>Find Your Custom 3-Step Routine</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Slide-out Cart */}
      <SlideOutCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}