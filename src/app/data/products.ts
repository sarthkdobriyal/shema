export type Category = 'men' | 'women';

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  imageUrl: string;
  description: string;
  sizes: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Classic White Shirt',
    category: 'men',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600',
    description: 'A crisp, tailored white shirt for everyday wear.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 2,
    name: 'Black Blazer',
    category: 'men',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=600',
    description: 'Sharp black blazer suitable for formal occasions.',
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: 3,
    name: 'Denim Jacket',
    category: 'men',
    price: 54.5,
    imageUrl: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=600',
    description: 'Rugged denim jacket for a casual look.',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 4,
    name: 'Slim Fit Trousers',
    category: 'men',
    price: 39.0,
    imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
    description: 'Comfortable slim fit trousers for daily use.',
    sizes: ['30', '32', '34', '36'],
  },
  {
    id: 5,
    name: 'Casual Sneakers',
    category: 'men',
    price: 65.0,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
    description: 'Lightweight sneakers for all-day comfort.',
    sizes: ['8', '9', '10', '11'],
  },
  {
    id: 6,
    name: 'Floral Kurti Set',
    category: 'women',
    price: 44.99,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600',
    description: 'Elegant floral kurti with matching pants.',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 7,
    name: 'Summer Floral Dress',
    category: 'women',
    price: 49.5,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    description: 'Light and breezy dress, perfect for summer.',
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 8,
    name: 'High-Waist Jeans',
    category: 'women',
    price: 42.0,
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
    description: 'Flattering high-waist jeans with stretch fit.',
    sizes: ['26', '28', '30', '32'],
  },
  {
    id: 9,
    name: 'Cropped Cardigan',
    category: 'women',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=600',
    description: 'Soft cropped cardigan, easy to layer.',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 10,
    name: 'Strappy Heels',
    category: 'women',
    price: 58.0,
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600',
    description: 'Elegant strappy heels for evening wear.',
    sizes: ['6', '7', '8', '9'],
  },
];
