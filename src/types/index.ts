export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  stock: number;
 
  thumbnail?: string; // Add this
  
}

export interface CartItem extends Product {
  quantity: number;
}