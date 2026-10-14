import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#FAF8F5] pt-16 pb-12 border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#2A2A2A]">
          {/* Brand Bio */}
          <div className="space-y-4">
            <h3 className="font-serif text-3xl tracking-widest text-[#FAF8F5]">LUMIÈRE</h3>
            <p className="text-sm text-[#A09E9B] leading-relaxed">
              Botanical science meets mindful daily rituals. Dermatologist tested, 100% vegan, cruelty-free care for your skin, scalp, and body.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C4A482] font-semibold mb-4">Shop Rituals</h4>
            <ul className="space-y-2.5 text-sm text-[#A09E9B]">
              <li><a href="#bestsellers" className="hover:text-[#FAF8F5] transition-colors">Skincare Essentials</a></li>
              <li><a href="#bestsellers" className="hover:text-[#FAF8F5] transition-colors">Hair & Scalp Health</a></li>
              <li><a href="#bestsellers" className="hover:text-[#FAF8F5] transition-colors">Restorative Body</a></li>
              <li><a href="/quiz" className="hover:text-[#FAF8F5] transition-colors">Custom Routine Quiz</a></li>
            </ul>
          </div>

          {/* Ethics & Philosophy */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C4A482] font-semibold mb-4">Our Standard</h4>
            <ul className="space-y-2.5 text-sm text-[#A09E9B]">
              <li>100% Cruelty-Free</li>
              <li>Vegan Certified</li>
              <li>Clean INCI Formulations</li>
              <li>Sustainable Glass Packaging</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#C4A482] font-semibold">Join the Inner Circle</h4>
            <p className="text-sm text-[#A09E9B]">
              Enjoy 15% off your first ritual and private access to new botanical drops.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#2A2A2A] text-sm text-[#FAF8F5] px-3.5 py-2.5 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-[#C4A482]"
              />
              <button className="bg-[#C4A482] text-[#1A1A1A] font-semibold text-xs px-4 py-2.5 rounded-r-md uppercase tracking-wider hover:bg-[#B39371] transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A7875] space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} LUMIÈRE Rituals Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-[#FAF8F5] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#FAF8F5] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#FAF8F5] transition-colors">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
}