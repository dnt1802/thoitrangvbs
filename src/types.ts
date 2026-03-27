export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  gender: 'Nam' | 'Nữ' | 'Unisex';
  description: string;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export type View = 'home' | 'shop' | 'product-detail' | 'cart' | 'checkout';
