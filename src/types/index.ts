export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  rating?: number;
  stock?: number;
  thumbnail?: string;
  images?: string[];
  createdAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
