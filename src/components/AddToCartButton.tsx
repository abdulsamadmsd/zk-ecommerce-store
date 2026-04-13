"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
  product: Product;
  showText?: boolean;
  className?: string;
}

export default function AddToCartButton({ product, showText = false, className = "" }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.title.substring(0, 15)}... added!`);
  };

  return (
    <button onClick={handleAddToCart} className={className}>
      <ShoppingCart size={18} />
      {showText && <span className="ml-2">Add to Cart</span>}
    </button>
  );
}