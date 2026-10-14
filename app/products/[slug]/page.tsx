'use client';

import React, { useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import SlideOutCart from '@/components/cart/SlideOutCart';
import Button from '@/components/ui/Button';
import { mockProducts, mockVariants, mockCrossSells } from '@/seed_data';
import { Heart, ShoppingBag, ChevronDown, Zap, Package, List, X, ShoppingCart } from 'lucide-react';

// --- Helper Components for PDP ---

interface VariantSwatchProps {
    variantId: string;
    name: string;
    priceModifier: number;
    selected?: boolean;
    onClick: () => void;
}

const VariantSwatch: React.FC<VariantSwatchProps> = ({ variantId, name, priceModifier, selected = false, onClick }) => (
    <button
        onClick={onClick}
        className={`w-14 h-14 rounded-full border-2 transition duration-300 flex items-center justify-center ${
            selected 
                ? 'border-text-dark ring-2 ring-brand-accent' 
                : 'border-text-light hover:border-brand-accent/50 bg-brand-bg'
        }`}
        aria-label={`${name} variant`}
    >
        <span className="text-sm font-medium text-text-dark">{name}</span>
    </button>
);

// Accordion Item Component
interface AccordionItemProps {
    title: string;
    content: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-brand-bg/50">
            <button 
                className="flex justify-between items-center w-full p-4 text-left font-semibold text-text-dark hover:bg-brand-bg/50 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{title}</span>
                <ChevronDown className={`w-5 h-5 text-text-light transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            {isOpen && (
                <div className="p-4 text-text-light border-t border-brand-bg/50">
                    <p>{content}</p>
                </div>
            )}
        </div>
    );
};


// --- Main PDP Page Component ---

const ProductDetail: React.FC = () => {
    // 1. Mock Data Setup (In a real app, this comes from TanStack Query)
    const product = mockProducts[0]; // Focusing on the first mock product for display
    const variants = mockVariants[product.id] || [];

    const [selectedVariantId, setSelectedVariantId] = useState(variants[0].id);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileScroll, setIsMobileScroll] = useState(false); // Mock for sticky bar trigger

    // Function to handle adding to cart (connects to Zustand store)
    const handleAddToCart = () => {
        // In a real app, we'd fetch the selected variant data first.
        console.log(`Adding ${product.name} (${selectedVariantId}) to cart!`);
        // Simulate adding the base product for simplicity in this demo
        // NOTE: A real implementation would need logic to handle price_modifier based on selectedVariantId
        // useCartStore.getState().addItem({ ...product, variantId: selectedVariantId }, 1);
        setIsCartOpen(true); // Trigger cart open simulation
    };


    return (
        <div className="min-h-screen bg-brand-bg font-sans">
            {/* Sticky Add to Cart Bar (Mobile Focus) */}
            {isMobileScroll && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-soft p-3 z-40 border-t border-brand-accent/50 md:hidden">
                    <Button 
                        variant="primary"
                        className="w-full py-3 text-lg"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                    </Button>
                </div>
            )}

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                    
                    {/* Left Column: Media Gallery & Purchase Info */}
                    <div className="space-y-8">
                        
                        {/* 1. Interactive Media Gallery */}
                        <div className="rounded-xl overflow-hidden shadow-soft border border-brand-bg/50">
                            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                                <img 
                                    src={product.image_urls[0]} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover transition duration-500 hover:scale-105"
                                />
                            </div>
                            {/* Thumbnail Selector Placeholder */}
                            <div className="flex space-x-3 p-4 bg-white border-t">
                                {product.image_urls.map((url, index) => (
                                    <img 
                                        key={index}
                                        src={url} 
                                        alt={`View ${index + 1}`} 
                                        className="w-16 h-16 object-cover rounded-md border-2 border-brand-accent cursor-pointer opacity-70 hover:opacity-100 transition"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Product Header & Rating */}
                        <div className="space-y-4">
                            <h1 className="text-5xl font-serif text-text-dark">{product.name}</h1>
                            
                            {/* Price and Rating */}
                            <div className="flex items-center space-x-4 pt-2">
                                <div className="flex text-yellow-500 mr-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-6 h-6 ${i < Math.round(product.rating) ? 'fill-yellow-500' : 'stroke-gray-300'}`} />
                                    ))}
                                </div>
                                <p className="text-xl font-bold text-text-dark">${product.base_price.toFixed(2)}</p>
                            </div>

                            {/* Purchase Toggle */}
                            <div className="flex space-x-4 pt-4 border-t border-brand-bg/50">
                                <Button 
                                    variant={isSubscribed ? 'primary' : 'outline'}
                                    onClick={() => setIsSubscribed(!isSubscribed)}
                                >
                                    {isSubscribed ? 'Switch to One-Time Purchase' : 'Subscribe & Save 15%'}
                                </Button>
                            </div>

                            {/* Variant Selector */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-text-dark">Select Size/Scent:</h3>
                                <div className="flex flex-wrap gap-4">
                                    {variants.map((variant) => (
                                        <VariantSwatch 
                                            key={variant.id}
                                            variantId={variant.id}
                                            name={variant.name}
                                            priceModifier={variant.price_modifier}
                                            selected={selectedVariantId === variant.id}
                                            onClick={() => setSelectedVariantId(variant.id)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Main CTA */}
                            <Button 
                                variant="primary"
                                onClick={handleAddToCart}
                                className="w-full py-4 text-xl mt-6"
                            >
                                Add to Bag
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Detailed Information & Cross-Sell */}
                    <div className="lg:sticky lg:top-28 self-start">
                        
                        {/* Self-Care Informational Accordions */}
                        <div className="space-y-4 border-t pt-6">
                            <AccordionItem 
                                title="🌿 Key Ingredients & Full INCI List"
                                content={`Our formula is rich in Hyaluronic Acid and Niacinamide for deep hydration. The full INCI list follows for complete transparency, highlighting active botanicals like Rosehip Oil and Calendula extract.`}
                            />
                            <AccordionItem 
                                title="✨ How to Use & Routine Placement"
                                content={`**Morning:** Apply a dime-sized amount to clean skin, focusing on dry patches. **Evening:** Use as a targeted treatment before bed for deep repair. Consistent use is key!`}
                            />
                             <AccordionItem 
                                title="🔬 Clinical & Consumer Results"
                                content={`Clinical trials showed that users experienced up to 94% increased hydration and a noticeable reduction in fine lines after just 7 days of consistent use.`}
                            />
                            <AccordionItem 
                                title="♻️ Sustainability & Packaging Recycling"
                                content={`We are committed to eco-conscious beauty. Our packaging is made from 100% post-consumer recycled materials, and we offer a mail-back program for recycling our containers.`}
                            />
                        </div>

                        {/* Cross-Sell Module */}
                        <div className="mt-12 p-6 bg-white rounded-xl shadow-soft border border-brand-bg/50">
                            <h3 className="text-2xl font-serif text-text-dark mb-6 border-b pb-3">Complete Your Routine</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {mockCrossSells.map(crossSell => (
                                    <div key={crossSell.id} className="flex flex-col items-center text-center group">
                                        <img src={crossSell.image_urls[0]} alt={crossSell.name} className="w-full h-48 object-cover rounded-lg mb-3 transition duration-300 group-hover:scale-[1.02]" />
                                        <h4 className="text-lg font-medium text-text-dark mb-1">{crossSell.name}</h4>
                                        <p className="text-xl font-bold text-brand-accent">${crossSell.price.toFixed(2)}</p>
                                        <Button variant="secondary" className="mt-3 w-full py-2">
                                            Add Complement
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide-out Cart Component - Always visible on screen, controlled by state */}
            <SlideOutCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
};

export default ProductDetail;