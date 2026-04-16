import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types";

type ProductDocument = Partial<Omit<Product, "id">>;

function normalizeProduct(
  id: string,
  data: ProductDocument | undefined,
): Product {
  return {
    id,
    title: data?.title?.trim() || "Untitled product",
    price: Number(data?.price ?? 0),
    description:
      data?.description?.trim() || "No product description is available yet.",
    category: data?.category?.trim() || "uncategorized",
    rating:
      typeof data?.rating === "number" ? data.rating : Number(data?.rating ?? 0),
    stock:
      typeof data?.stock === "number" ? data.stock : Number(data?.stock ?? 0),
    thumbnail: data?.thumbnail?.trim() || undefined,
    images: Array.isArray(data?.images) ? data.images.filter(Boolean) : [],
    createdAt: data?.createdAt,
  };
}

export function getProductImage(product: Product) {
  return product.thumbnail || product.images?.[0] || "/placeholder.png";
}

export async function getProducts(): Promise<Product[]> {
  const snapshot = await getDocs(query(collection(db, "products")));

  return snapshot.docs.map((productDoc) =>
    normalizeProduct(productDoc.id, productDoc.data() as ProductDocument),
  );
}

export async function getProductById(id: string): Promise<Product | null> {
  const snapshot = await getDoc(doc(db, "products", id));

  if (!snapshot.exists()) {
    return null;
  }

  return normalizeProduct(snapshot.id, snapshot.data() as ProductDocument);
}
