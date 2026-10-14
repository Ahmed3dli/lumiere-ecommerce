import React from 'react';
import { useCartStore } from '@/lib/store/cartStore';
import Button from '@/components/ui/Button';
import { Star, ShoppingCart, Heart } from 'lucide-react';

// Mock Product Data Structure (In a real app, this would come from TanStack Query/API)
interface MockProduct {
  id: string;
  name: string;
  base_price: number;
  image_urls: string[];
  rating: number; // 1 to 5
  badges: string[]; // e.g., ['Bestseller', 'New']
}

interface ProductCardProps {
  product: MockProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, 1);
    // In a real app, this would trigger a notification or slide-out cart open
  };

  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden flex flex-col transition duration-300 hover:shadow-hover-lift border border-brand-bg/50">
      {/* Image Gallery Area */}
      <div className="relative aspect-square bg-brand-bg overflow-hidden">
        <img
          src={product.image_urls[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Hover Image Swap Placeholder */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Heart className="w-12 h-12 text-white opacity-80 transform group-hover:scale-125 transition-transform" />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-medium text-text-dark mb-1 truncate">{product.name}</h3>
        
        {/* Ratings and Badges */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-500 mr-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-yellow-500' : 'stroke-gray-300'}`} />
            ))}
          </div>
          <span className="text-sm text-text-light ml-2">({product.rating.toFixed(1)})</span>
        </div>
        
        {product.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.badges.map((badge) => (
              <span key={badge} className="text-xs bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded-full font-medium">
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Price and CTA */}
        <div className="mt-auto pt-3 flex justify-between items-center">
          <p className="text-xl font-bold text-text-dark">${product.base_price.toFixed(2)}</p>
          <Button 
            variant="primary"
            onClick={handleAddToCart}
            className="flex items-center gap-2 w-full mt-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;