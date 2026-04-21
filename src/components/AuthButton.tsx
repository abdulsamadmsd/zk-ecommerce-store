"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import UserMenu from "./UserMenu";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // New state for click toggle
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {  const snap = await getDoc(doc(db, "users", currentUser.uid));
        setIsAdmin(snap.data()?.role === "admin");
      }else{setIsAdmin(false) }   {
        setLoading(false);
        
      }
    });
    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const ADMIN_EMAILS = ["abdulsamadpak111@gmail.com"];
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          lastLogin: serverTimestamp(),
          role: ADMIN_EMAILS.includes(user.email || "") ? "admin" : "customer",
        },
        { merge: true },
      );
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  if (loading)
    return (
      <div className="w-8 h-8 animate-pulse bg-gray-200 dark:bg-slate-800 rounded-full"></div>
    );

  return (
    <div className="flex items-center">
      {user ? (
        <div
          ref={dropdownRef}
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-slate-800 ml-2 cursor-pointer select-none"
        >
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-white uppercase font-bold tracking-widest leading-none">
              Account
            </p>
            <p
              className="text-lg font-semibold leading-tight
             text-white "
            >
              {user.displayName ? user.displayName : "User"}
            </p>
          </div>

          <div className="relative w-10 h-10 ">
            <Image
              src={user.photoURL || "/default-avatar.png"}
              alt="User"
              fill
              sizes="40px"
              referrerPolicy="no-referrer"
              className={`rounded-full ring-2 shadow-md transition-all 
                object-cover ${isOpen ? "ring-blue-500" : "ring-white dark:ring-slate-900"}`}
            />
            <div
              className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2
             border-white dark:border-slate-950 rounded-full"
            ></div>
          </div>

          <UserMenu
            isOpen={isOpen}
            user={user}
            onLogout={handleLogout}
            onClose={() => setIsOpen(false)}
          />
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="flex items-center gap-3 bg-white dark:bg-slate-900 
          border border-gray-300 dark:border-slate-700 px-3 py-2 rounded-lg transition-all
           hover:border-blue-400 hover:shadow-md active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91a8.78 8.78 0 0 0 2.69-6.62z"
              fill="#4285F4"
            />
            <path
              d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.8.54-1.83.86-3.05.86c-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A8.99 8.99 0 0 0 9 18z"
              fill="#34A853"
            />
            <path
              d="M3.96 10.71a5.41 5.41 0 0 1 0-3.42V4.96H.96a8.99 8.99 0 0 0 0 8.08l3-2.33z"
              fill="#FBBC05"
            />
            <path
              d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.99 8.99 0 0 0 9 0C5.28 0 2.11 2.11.96 4.96L3.96 7.29A5.41 5.41 0 0 1 9 3.58z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
            LogIn
          </span>
        </button>
      )}
    </div>
  );
}
