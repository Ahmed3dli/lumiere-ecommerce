import React, { useState } from 'react';
import { useCartStore } from '@/lib/store/cartStore';
import Button from '@/components/ui/Button';
import { ShoppingCart, Package, ChevronDown, X, DollarSign } from 'lucide-react';

// ✅ Change to this:
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;     // <-- Added ? so it matches cartStore
    size?: string;
}

interface SlideOutCartProps {
    isOpen: boolean;
    onClose: () => void;
}

const SlideOutCart: React.FC<SlideOutCartProps> = ({ isOpen, onClose }) => {
    const { items, getTotalPrice, removeItem, updateQuantity } = useCartStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);

    if (!isOpen) return null;

    // --- Calculations ---
    const subtotal = getTotalPrice();
    // Mock Free Shipping Threshold: $50. Calculate amount needed.
    const shippingThreshold = 50.00;
    const remainingForShipping = Math.max(0, shippingThreshold - subtotal);
    const shippingMessage = remainingForShipping > 0
        ? `Add $${remainingForShipping.toFixed(2)} more for Free Shipping!`
        : "You qualify for Free Shipping!";


    // --- Item Rendering Component ---
    const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
        const updateQuantity = useCartStore((state) => state.updateQuantity);

        return (
            <div className="flex items-center py-4 border-b border-brand-bg/50 last:border-b-0">
                {/* Thumbnail */}
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                
                {/* Details */}
                <div className="flex-grow min-w-0">
                    <p className="font-medium text-text-dark truncate">{item.name}</p>
                    <p className="text-sm text-text-light">${item.price.toFixed(2)} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center mx-4">
                    <Button 
                        variant="outline" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-2 h-8 w-8 text-text-dark border-brand-accent/50 hover:bg-brand-bg"
                    >-</Button>
                    <span className="px-3 py-1 text-text-dark font-semibold">{item.quantity}</span>
                    <Button 
                        variant="outline" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 h-8 w-8 text-text-dark border-brand-accent/50 hover:bg-brand-bg"
                    >+</Button>
                </div>

                {/* Total */}
                <div className="w-24 text-right font-semibold text-text-dark">${(item.price * item.quantity).toFixed(2)}</div>

                {/* Remove Button */}
                <Button 
                    variant="outline" 
                    onClick={() => removeItem(item.id)}
                    className="ml-4 p-2 h-8 w-8 text-red-500 border-red-300 hover:bg-red-50"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>
        );
    };

    return (
        <>
            {/* Backdrop Overlay */}
            <div 
                className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Sidebar Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-4 mb-4">
                        <h2 className="text-3xl font-serif text-text-dark">Your Bag</h2>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-brand-bg transition">
                            <X className="w-6 h-6 text-text-light" />
                        </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-grow overflow-y-auto space-y-4 mb-6">
                        {items.length === 0 ? (
                            <p className="text-center text-text-light mt-10">Your bag is empty.</p>
                        ) : (
                            items.map((item) => (
                                <CartItemRow key={item.id} item={item} />
                            ))
                        )}
                    </div>

                    {/* Order Summary & Checkout */}
                    <div className="border-t pt-4 space-y-3">
                        <div className="flex justify-between text-lg font-semibold mb-2">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        {/* Dynamic Shipping Bar */}
                        <div className={`p-3 rounded-lg text-center ${remainingForShipping > 0 ? 'bg-accent-blush/10 text-text-dark' : 'bg-brand-bg/70 text-text-light'}`}>
                            <p className="font-medium">{shippingMessage}</p>
                        </div>

                        <div className="flex justify-between text-2xl font-bold pt-3 border-t border-brand-bg">
                            <span>Total:</span>
                            <span className="text-text-dark">${(subtotal + remainingForShipping).toFixed(2)}</span>
                        </div>

                        <Button 
                            variant="primary"
                            className="w-full mt-4 py-3 text-lg"
                            onClick={() => { /* Mock Checkout Logic */ onClose(); alert('Proceeding to secure checkout!'); }}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SlideOutCart;