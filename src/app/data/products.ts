export type Category = 'men' | 'women';

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  imageUrl: string;
  description: string;
  sizes: string[];
  highlights: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Classic White Shirt',
    category: 'men',
    price: 29.99,
    imageUrl: 'https://m.media-amazon.com/images/I/51aXWQqTxxL._SY879_.jpg',
    description: 'A crisp, tailored white shirt for everyday wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    highlights: ['100% cotton', 'Machine washable', 'Tailored fit'],
  },
  {
    id: 2,
    name: 'Black Blazer',
    category: 'men',
    price: 79.99,
    imageUrl: 'https://m.media-amazon.com/images/I/517VvkWQbXL._SX679_.jpg',
    description: 'Sharp black blazer suitable for formal occasions.',
    sizes: ['M', 'L', 'XL'],
    highlights: ['Slim tailored cut', 'Two-button closure', 'Dry clean only'],
  },
  {
    id: 3,
    name: 'Denim Jacket',
    category: 'men',
    price: 54.5,
    imageUrl: 'https://m.media-amazon.com/images/I/71e5Iu8ju8L._SY879_.jpg',
    description: 'Rugged denim jacket for a casual look.',
    sizes: ['S', 'M', 'L'],
    highlights: ['Sturdy cotton denim', 'Button-front closure', 'Classic collar'],
  },
  {
    id: 4,
    name: 'Slim Fit Trousers',
    category: 'men',
    price: 39.0,
    imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
    description: 'Comfortable slim fit trousers for daily use.',
    sizes: ['30', '32', '34', '36'],
    highlights: ['Stretch fabric blend', 'Slim tapered leg', 'Machine washable'],
  },
  {
    id: 5,
    name: 'Casual Sneakers',
    category: 'men',
    price: 65.0,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
    description: 'Lightweight sneakers for all-day comfort.',
    sizes: ['8', '9', '10', '11'],
    highlights: ['Breathable mesh upper', 'Cushioned insole', 'Rubber outsole'],
  },
  {
    id: 6,
    name: 'Floral Kurti Set',
    category: 'women',
    price: 44.99,
    imageUrl: 'https://m.media-amazon.com/images/I/71Xvagl5gsL._SX679_.jpg',
    description: 'Elegant floral kurti with matching pants.',
    sizes: ['S', 'M', 'L'],
    highlights: ['Soft rayon fabric', 'Includes matching pants', 'Hand wash recommended'],
  },
  {
    id: 7,
    name: 'Summer Floral Dress',
    category: 'women',
    price: 49.5,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    description: 'Light and breezy dress, perfect for summer.',
    sizes: ['XS', 'S', 'M', 'L'],
    highlights: ['Lightweight breathable fabric', 'Relaxed A-line fit', 'Machine washable'],
  },
  {
    id: 8,
    name: 'High-Waist Jeans',
    category: 'women',
    price: 42.0,
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
    description: 'Flattering high-waist jeans with stretch fit.',
    sizes: ['26', '28', '30', '32'],
    highlights: ['Stretch denim', 'High-rise waist', 'Five-pocket styling'],
  },
  {
    id: 9,
    name: 'Cropped Cardigan',
    category: 'women',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=600',
    description: 'Soft cropped cardigan, easy to layer.',
    sizes: ['S', 'M', 'L'],
    highlights: ['Soft knit fabric', 'Cropped length', 'Easy layering piece'],
  },
  {
    id: 10,
    name: 'Strappy Heels',
    category: 'women',
    price: 58.0,
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600',
    description: 'Elegant strappy heels for evening wear.',
    sizes: ['6', '7', '8', '9'],
    highlights: ['Faux leather straps', 'Cushioned footbed', 'Adjustable buckle closure'],
  },
];
