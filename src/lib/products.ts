import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

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
