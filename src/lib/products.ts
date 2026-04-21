import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { Product } from "@/types";

// 📦 Add Product
export async function createProduct(data: Omit<Product, "id">) {
  return await addDoc(collection(db, "products"), data);
}

// 📦 Get Products
export async function getProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, "products"));

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">),
  }));
}

// 📦 Get Product By ID
export async function getProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, "products", id));

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...(snap.data() as Omit<Product, "id">),
  };
}

// 🖼️ Get Product Image
export function getProductImage(product: Product): string {
  return (
    (product as any).imageUrl ||
    (product as any).image ||
    product.thumbnail ||
    "/placeholder.png"
  );
}
