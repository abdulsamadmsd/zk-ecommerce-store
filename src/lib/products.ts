import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

// 📦 Add Product
export async function createProduct(data: any) {
  return await addDoc(collection(db, "products"), data);
}

// 📦 Get Products
export async function getProducts() {
  const snap = await getDocs(collection(db, "products"));

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// 📦 Get Product By ID
export async function getProductById(id: string) {
  const snap = await getDoc(doc(db, "products", id));

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
}
// 🖼️ Get Product Image
export function getProductImage(product: any): string {
  return (
    product.imageUrl ||
    product.image ||
    product.thumbnail ||
    "/placeholder.png"
  );
}