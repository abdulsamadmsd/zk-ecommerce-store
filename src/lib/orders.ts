"use client";

import { CartItem, Order, OrderCustomer, OrderStatus } from "@/types";

const ORDERS_STORAGE_KEY = "zk_orders";
export const ORDER_SHIPPING_FEE = 10;

export const ORDER_STATUS_STEPS: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
];

function canUseStorage() {
  return typeof window !== "undefined";
}

function parseStoredOrders(rawOrders: string | null): Order[] {
  if (!rawOrders) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawOrders) as Order[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse stored orders", error);
    return [];
  }
}

function generateOrderId() {
  const randomPart =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);

  return `ORD-${Date.now()}-${randomPart.toUpperCase()}`;
}

export function getStoredOrders(): Order[] {
  if (!canUseStorage()) {
    return [];
  }

  return parseStoredOrders(window.localStorage.getItem(ORDERS_STORAGE_KEY));
}

export function getOrderById(orderId: string): Order | null {
  return getStoredOrders().find((order) => order.id === orderId) || null;
}

export function calculateOrderSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateOrderTotal(subtotal: number) {
  return subtotal + ORDER_SHIPPING_FEE;
}

export function createOrder({
  customer,
  cartItems,
}: {
  customer: OrderCustomer;
  cartItems: CartItem[];
}): Order {
  if (!cartItems.length) {
    throw new Error("Cannot create an order without products.");
  }

  const subtotal = calculateOrderSubtotal(cartItems);
  const newOrder: Order = {
    id: generateOrderId(),
    customer,
    items: cartItems.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      thumbnail: item.thumbnail || item.images?.[0],
      category: item.category,
    })),
    subtotal,
    shippingAmount: ORDER_SHIPPING_FEE,
    totalAmount: calculateOrderTotal(subtotal),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  if (canUseStorage()) {
    const existingOrders = getStoredOrders();
    window.localStorage.setItem(
      ORDERS_STORAGE_KEY,
      JSON.stringify([newOrder, ...existingOrders]),
    );
  }

  return newOrder;
}
