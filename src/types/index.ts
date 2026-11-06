export type ProductCategory = 
  | 'all'
  | 'headphones'
  | 'earbuds'
  | 'speakers'
  | 'microphones'
  | 'amplifiers'
  | 'accessories'
  | 'new-arrivals';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImage?: string;
  description: string;
  specs: {
    driver?: string;
    frequency?: string;
    battery?: string;
    connectivity?: string;
    weight?: string;
    impedance?: string;
  };
  features: string[];
  colors: { name: string; hex: string }[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isOnSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface EditorialArticle {
  id: string;
  category: 'GUIDE' | 'RECOMMENDED' | 'INSIGHT';
  title: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
  author: string;
}

export interface CategoryNav {
  id: ProductCategory;
  label: string;
  iconName: string;
}
