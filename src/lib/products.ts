import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { Product } from "@/types";

export type ProductFormData = {
  title: string;
  price: number;
  category?: string;
  thumbnail?: string;
  description?: string;
};

function normalizeProduct(id: string, data: DocumentData): Product {
  return {
    id,
    title: data.title || "Untitled Product",
    price: Number(data.price) || 0,
    description: data.description || "",
    category: data.category || "General",
    rating: data.rating,
    stock: data.stock,
    thumbnail: data.thumbnail || data.imageUrl || data.image || "",
    images: data.images,
    createdAt: data.createdAt,
  };
}

export async function createProduct(data: ProductFormData): Promise<Product> {
  const productData = {
    title: data.title.trim(),
    price: Number(data.price) || 0,
    category: data.category?.trim() || "General",
    thumbnail: data.thumbnail?.trim() || "",
    description: data.description?.trim() || "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "products"), productData);
  return normalizeProduct(docRef.id, productData);
}

export async function getProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, "products"));

  return snap.docs.map((doc) => normalizeProduct(doc.id, doc.data()));
}

export async function getProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, "products", id));

  if (!snap.exists()) return null;

  return normalizeProduct(snap.id, snap.data());
}

export async function updateProduct(
  id: string,
  data: ProductFormData,
): Promise<ProductFormData> {
  const productData = {
    title: data.title.trim(),
    price: Number(data.price) || 0,
    category: data.category?.trim() || "General",
    thumbnail: data.thumbnail?.trim() || "",
    description: data.description?.trim() || "",
    updatedAt: serverTimestamp(),
  };

  await updateDoc(doc(db, "products", id), productData);
  return productData;
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, "products", id));
}

export function getProductImage(product: Product): string {
  return (
    (product as any).imageUrl ||
    (product as any).image ||
    product.thumbnail ||
    "/placeholder.png"
  );
}
