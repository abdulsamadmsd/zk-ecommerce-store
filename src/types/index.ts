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

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered";

export interface OrderCustomer {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  phone: string;
}

export interface OrderItem {
  id: Product["id"];
  title: Product["title"];
  price: Product["price"];
  quantity: CartItem["quantity"];
  thumbnail?: Product["thumbnail"];
  category: Product["category"];
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shippingAmount: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}
