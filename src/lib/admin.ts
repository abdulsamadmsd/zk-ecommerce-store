"use client";

import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export async function isCurrentUserAdmin() {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    return false;
  }

  const userDoc = await getDoc(doc(db, "users", currentUser.uid));
  return userDoc.exists() && userDoc.data().role === "admin";
}

export function subscribeToAdminState(
  callback: (state: {
    isLoading: boolean;
    isAdmin: boolean;
    isSignedIn: boolean;
  }) => void,
) {
  callback({
    isLoading: true,
    isAdmin: false,
    isSignedIn: false,
  });

  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback({
        isLoading: false,
        isAdmin: false,
        isSignedIn: false,
      });
      return;
    }

    const userDoc = await getDoc(doc(db, "users", user.uid));

    callback({
      isLoading: false,
      isAdmin: userDoc.exists() && userDoc.data().role === "admin",
      isSignedIn: true,
    });
  });
}
