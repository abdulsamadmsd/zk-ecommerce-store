"use client";

import { CartItem, Order, OrderCustomer, OrderStatus } from "@/types";

const ORDERS_STORAGE_KEY = "zk_orders";
const ORDERS_UPDATED_EVENT = "zk_orders_updated";
export const ORDER_SHIPPING_FEE = 10;

export const ORDER_STATUS_STEPS: OrderStatus[] = [
  "pending",
  "approved",
  "processing",
  "shipped",
  "delivered",
];

const VALID_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ["approved", "rejected"],
  approved: ["processing", "rejected"],
  rejected: [],
  processing: ["shipped"],
  shipped: ["delivered"],
  delivered: [],
};

function canUseStorage() {
  return typeof window !== "undefined";
}

function notifyOrdersChanged() {
  if (!canUseStorage()) {
    return;
  }

  window.dispatchEvent(new CustomEvent(ORDERS_UPDATED_EVENT));
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

function saveStoredOrders(orders: Order[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  notifyOrdersChanged();
}

export function getAllOrders() {
  return getStoredOrders();
}

export function getOrderById(orderId: string): Order | null {
  return getStoredOrders().find((order) => order.id === orderId) || null;
}

export function canTransitionOrderStatus(
  currentStatus: OrderStatus,
  nextStatus: OrderStatus,
) {
  return VALID_STATUS_TRANSITIONS[currentStatus].includes(nextStatus);
}

export function updateOrderStatus(orderId: string, nextStatus: OrderStatus) {
  const orders = getStoredOrders();
  const targetOrder = orders.find((order) => order.id === orderId);

  if (!targetOrder) {
    throw new Error("Order not found.");
  }

  if (targetOrder.status === nextStatus) {
    return targetOrder;
  }

  if (!canTransitionOrderStatus(targetOrder.status, nextStatus)) {
    throw new Error(
      `Invalid order transition: ${targetOrder.status} -> ${nextStatus}`,
    );
  }

  const updatedOrder: Order = {
    ...targetOrder,
    status: nextStatus,
    updatedAt: new Date().toISOString(),
  };

  saveStoredOrders(
    orders.map((order) => (order.id === orderId ? updatedOrder : order)),
  );

  return updatedOrder;
}

export function subscribeToOrders(listener: () => void) {
  if (!canUseStorage()) {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === ORDERS_STORAGE_KEY) {
      listener();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(ORDERS_UPDATED_EVENT, listener);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(ORDERS_UPDATED_EVENT, listener);
  };
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
    updatedAt: new Date().toISOString(),
  };

  if (canUseStorage()) {
    const existingOrders = getStoredOrders();
    saveStoredOrders([newOrder, ...existingOrders]);
  }

  return newOrder;
}
