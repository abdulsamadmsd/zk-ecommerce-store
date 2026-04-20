"use client";

// React hooks
import { useEffect, useState } from "react";

// Firebase auth + firestore
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Next.js router
import { useRouter } from "next/navigation";

// Your firebase config
import { db } from "@/lib/firebase";

// Custom hook
export default function useAdminAuth() {
  // store firebase user
  const [user, setUser] = useState<User | null>(null);

  // admin check
  const [isAdmin, setIsAdmin] = useState(false);

  // loading state
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // ❌ not logged in
      if (!currentUser) {
        router.push("/login");
        return;
      }

      setUser(currentUser);

      try {
        // get user role from firestore
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        // ✅ admin check
        if (docSnap.exists() && docSnap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          router.push("/"); // ❌ not admin
        }
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return { user, isAdmin, loading };
}
