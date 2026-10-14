// seed_data.ts - Realistic Mock Product Data
export const mockProducts = [
  {
    id: 'prod-001',
    name: 'Hydra-Barrier Botanical Facial Lotion',
    base_price: 34.00,
    image_urls: [
      'https://via.placeholder.com/600x600/FAF8F5/1A1A1A?text=Lotion+Hero+Shot',
      'https://via.placeholder.com/600x600/E8C2C2/1A1A1A?text=Texture+Detail'
    ],
    rating: 4.8,
    badges: ['Bestseller', 'Derm-Approved'],
  },
  {
    id: 'prod-002',
    name: 'Calm & Restore Shampoo Bar',
    base_price: 22.50,
    image_urls: [
      'https://via.placeholder.com/600x600/B8A39D/1A1A1A?text=Shampoo+Bar',
      'https://via.placeholder.com/600x600/FAF8F5/1A1A1A?text=Packaging+Detail'
    ],
    rating: 4.5,
    badges: ['New', 'Vegan'],
  },
  {
    id: 'prod-003',
    name: 'Niacinamide Brightening Serum',
    base_price: 59.99,
    image_urls: [
      'https://via.placeholder.com/600x600/1A1A1A/FAF8F5?text=Serum+Bottle',
      'https://via.placeholder.com/600x600/E8C2C2/1A1A1A?text=Ingredient+Focus'
    ],
    rating: 4.9,
    badges: ['Best Seller'],
  },
];

export const mockVariants = {
    'prod-001': [
        { id: 'size-50ml', name: '50ml', price_modifier: 0 },
        { id: 'size-100ml', name: '100ml', price_modifier: 6.00 }, // +$6.00 for larger size
    ],
    'prod-002': [
        { id: 'standard', name: 'Standard Bar', price_modifier: 0 },
    ],
    'prod-003': [
        { id: 'standard', name: '30ml Dropper', price_modifier: 0 },
    ]
};

export const mockCrossSells = [
    { id: 'cross-1', name: 'Scalp Massager Tool', price: 39.99, image_urls: ['https://via.placeholder.com/300x300/B8A39D/1A1A1A?text=Massager'] },
    { id: 'cross-2', name: 'Organic Rose Water Spray', price: 18.00, image_urls: ['https://via.placeholder.com/300x300/FAF8F5/1A1A1A?text=Rose+Water'] },
];