-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: categories
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table: products
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    details JSONB, -- For INCI ingredients, how-to-use, clinical trials
    image_url TEXT,
    tag VARCHAR(50), -- e.g., 'Bestseller', 'New'
    rating NUMERIC(2, 1) DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table: product_variants
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL, -- e.g., "50ml", "100ml"
    sku VARCHAR(50) UNIQUE NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    compare_at_price NUMERIC(10, 2),
    inventory_quantity INTEGER DEFAULT 100 CHECK (inventory_quantity >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table: orders
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stripe_session_id VARCHAR(255) UNIQUE,
    customer_email VARCHAR(255) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    shipping_address JSONB,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Table: order_items
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_variant_id UUID REFERENCES public.product_variants(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON public.orders(customer_email);

-- ============================================================
-- SEED DATA: Categories & Products
-- ============================================================

-- Insert Categories
INSERT INTO public.categories (id, name, slug) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Skincare', 'skincare'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Haircare', 'haircare'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Clean Makeup', 'makeup'),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Bodycare', 'bodycare')
ON CONFLICT (slug) DO NOTHING;

-- Insert 4 Featured Products
INSERT INTO public.products (id, name, slug, description, category_id, details, image_url, tag, rating, reviews_count) VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'Hydra-Barrier Botanical Lotion',
    'hydra-barrier-lotion',
    'A lightweight, multi-depth moisture lotion formulated with squalane and ceramides to repair the skin barrier.',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '{"ingredients": "Water, Squalane, Niacinamide, Ceramide NP, Sodium Hyaluronate", "how_to_use": "Apply 2 pumps morning and evening to face and neck.", "clinicals": "94% felt immediate barrier relief."}',
    'https://images.unsplash.com/photo-1608248597359-335688a23078?q=80&w=800&auto=format&fit=crop',
    'Bestseller',
    4.9,
    128
),
(
    '22222222-2222-2222-2222-222222222222',
    'Restorative Scalp & Hair Nectar',
    'restorative-hair-nectar',
    'An active botanical scalp treatment that stimulates roots, calms irritation, and adds luminous shine.',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    '{"ingredients": "Rosemary Leaf Extract, Jojoba Oil, Biotin, Tea Tree", "how_to_use": "Massage 4-6 drops onto dry scalp 20 minutes before washing.", "clinicals": "89% reported reduced scalp flaking."}',
    'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop',
    'Award Winner',
    5.0,
    94
),
(
    '33333333-3333-3333-3333-333333333333',
    'Dew-Finish Rose Lip & Cheek Glaze',
    'dew-finish-lip-cheek-glaze',
    'A clean, hydrating multi-use tint that imparts a natural botanical flush with a dewy, non-sticky finish.',
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    '{"ingredients": "Damask Rose Oil, Shea Butter, Vitamin E, Plant Pigments", "how_to_use": "Dab onto cheekbones and lips with clean fingertips.", "clinicals": "100% agreed it keeps lips soft for 8 hours."}',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
    'New',
    4.8,
    67
),
(
    '44444444-4444-4444-4444-444444444444',
    'Calming Chamomile Body Elixir',
    'calming-body-elixir',
    'A fast-absorbing dry body oil that soothes sensitive skin and seals in deep hydration after showering.',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
    '{"ingredients": "Chamomile Extract, Sweet Almond Oil, Squalane, Lavender", "how_to_use": "Smooth all over damp body right after bathing.", "clinicals": "96% noticed smoother body skin."}',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    'Trending',
    4.9,
    142
)
ON CONFLICT (slug) DO NOTHING;

-- Insert Variants for Each Product
INSERT INTO public.product_variants (product_id, title, sku, price, compare_at_price, inventory_quantity) VALUES
('11111111-1111-1111-1111-111111111111', '100ml / 3.4 fl. oz.', 'SKU-LOTION-100', 38.00, 45.00, 150),
('22222222-2222-2222-2222-222222222222', '50ml / 1.7 fl. oz.', 'SKU-HAIR-50', 42.00, NULL, 90),
('33333333-3333-3333-3333-333333333333', '15ml / 0.5 fl. oz.', 'SKU-GLAZE-15', 26.00, NULL, 200),
('44444444-4444-4444-4444-444444444444', '200ml / 6.8 fl. oz.', 'SKU-BODY-200', 46.00, 52.00, 75)
ON CONFLICT (sku) DO NOTHING;