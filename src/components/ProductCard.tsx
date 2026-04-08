import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 p-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors h-10">
            {product.title}
          </h3>
        </Link>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          <button className="bg-black text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
