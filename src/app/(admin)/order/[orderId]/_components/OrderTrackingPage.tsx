"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { getOrderById, ORDER_STATUS_STEPS } from "@/lib/orders";
import { Order, OrderStatus } from "@/types";

const STATUS_COPY: Record<OrderStatus, string> = {
  pending: "Your order has been created and is waiting for confirmation.",
  approved: "Your order has been approved and is ready for fulfillment.",
  rejected: "This order was rejected by the store admin.",
  processing: "Your items are being prepared for shipment.",
  shipped: "Your package is on the way.",
  delivered: "Your order has been delivered successfully.",
};

const STATUS_ICONS = {
  pending: Clock3,
  approved: CheckCircle2,
  rejected: ShieldCheck,
  processing: ShoppingBag,
  shipped: Truck,
  delivered: PackageCheck,
} satisfies Record<OrderStatus, typeof Clock3>;

function formatStatusLabel(status: OrderStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function OrderTrackingPage({
  orderId,
}: {
  orderId: string;
}) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isReady, setIsReady] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setOrder(getOrderById(orderId));
    setIsReady(true);
  }, [orderId]);

  useEffect(() => {
    if (searchParams.get("created") === "1") {
      toast.success("Order Placed Successfully");
    }
  }, [searchParams]);

  const activeStepIndex = useMemo(() => {
    if (!order) {
      return -1;
    }

    return ORDER_STATUS_STEPS.indexOf(order.status);
  }, [order]);

  if (!isReady) {
    return null;
  }

  if (!order) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-red-500">
          Order Not Found
        </p>
        <h1 className="mb-4 text-4xl font-black text-slate-900 dark:text-white">
          This order is not available on this device.
        </h1>
        <p className="mb-8 text-slate-500 dark:text-slate-400">
          Orders are currently stored locally in this browser. If you cleared local storage or switched devices, this order cannot be recovered here.
        </p>
        <Link
          href="/cart"
          className="rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-600 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-500 dark:hover:text-white"
        >
          Back to cart
        </Link>
      </div>
    );
  }

  const CurrentStatusIcon = STATUS_ICONS[order.status];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Store
        </Link>

        <div className="rounded-[32px] border border-emerald-100 bg-emerald-50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-emerald-600">
                <CheckCircle2 size={18} />
                <span className="text-sm font-bold uppercase tracking-[0.2em]">
                  Order Confirmed
                </span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                Order {order.id}
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {STATUS_COPY[order.status]}
              </p>
            </div>

            <a
              href="#tracking-timeline"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-600 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-500 dark:hover:text-white"
            >
              Track Order
            </a>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <section
            id="tracking-timeline"
            className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-6 flex items-center gap-3">
              <CurrentStatusIcon className="text-blue-600" size={24} />
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Order Status
                </h2>
                <p className="text-slate-500 dark:text-slate-400">
                  Current stage: {formatStatusLabel(order.status)}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {ORDER_STATUS_STEPS.map((status, index) => {
                const stepActive = index <= activeStepIndex;
                const stepCurrent = index === activeStepIndex;

                return (
                  <div key={status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-black ${
                          stepActive
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-200 bg-white text-gray-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < ORDER_STATUS_STEPS.length - 1 && (
                        <div
                          className={`mt-2 h-12 w-[2px] ${
                            stepActive
                              ? "bg-blue-600"
                              : "bg-gray-200 dark:bg-slate-700"
                          }`}
                        />
                      )}
                    </div>

                    <div className="pb-6">
                      <p
                        className={`text-lg font-bold ${
                          stepCurrent
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {formatStatusLabel(status)}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {STATUS_COPY[status]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-6 text-2xl font-black text-slate-900 dark:text-white">
              Order Summary
            </h2>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 dark:border-slate-800 sm:flex-row sm:items-center"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-gray-50 dark:bg-slate-800">
                    <Image
                      src={item.thumbnail || "/placeholder.png"}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.category} • Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-lg font-black text-blue-600 dark:text-blue-400">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-6 text-2xl font-black text-slate-900 dark:text-white">
              Payment & Delivery
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 text-blue-600" size={18} />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    Shipping Address
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    {order.customer.address}, {order.customer.city}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 text-blue-600" size={18} />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    Customer
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    {order.customer.email} • {order.customer.phone}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-6 text-2xl font-black text-slate-900 dark:text-white">
              Totals
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Shipping</span>
                <span>${order.shippingAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-4 text-lg font-black text-slate-900 dark:border-slate-800 dark:text-white">
                <span>Total</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-3 text-xs text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

