"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth, db } from "@/lib/firebase"; 
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { User as UserIcon, Package, Settings, LogOut } from "lucide-react";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        lastLogin: serverTimestamp(),
        role: "customer"
      }, { merge: true });

    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  if (loading) return <div className="w-8 h-8 animate-pulse bg-gray-200 dark:bg-slate-800 rounded-full"></div>;

  return (
    <div className="flex items-center">
      {user ? (
        <div className="group relative flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-slate-800 ml-2 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-none">Account</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{user.displayName?.split(" ")[0]}</p>
          </div>
          
          <div className="relative w-10 h-10">
            <Image 
              src={user.photoURL || "/default-avatar.png"} 
              alt="User" 
              fill
              referrerPolicy="no-referrer"
              className="rounded-full ring-2 ring-white dark:ring-slate-900 shadow-md group-hover:ring-blue-500 transition-all object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-950 rounded-full"></div>
          </div>

          {/* --- HIGH LEVEL DROPDOWN --- */}
          <div className="absolute top-full right-0 mt-3 w-60 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-2xl rounded-2xl py-2 
              opacity-0 invisible translate-y-2 
              group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 
              transition-all duration-300 ease-out z-50">
            
            <div className="px-4 py-3 border-b border-gray-50 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 rounded-t-2xl">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tight">Signed in as</p>
              <p className="text-xs font-medium text-gray-900 dark:text-gray-200 truncate">{user.email}</p>
            </div>

            <div className="p-1">
              {/* MAIN PROFILE SECTION ADDED HERE */}
              <Link href="/profile" className="flex items-center gap-2 w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 rounded-lg transition-colors">
                <UserIcon size={16} />
                My Profile
              </Link>
              
              <Link href="/orders" className="flex items-center gap-2 w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 rounded-lg transition-colors">
                <Package size={16} />
                My Orders
              </Link>

              <Link href="/settings" className="flex items-center gap-2 w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 rounded-lg transition-colors">
                <Settings size={16} />
                Account Settings
              </Link>
            </div>

            <div className="p-1 border-t border-gray-50 dark:border-slate-800">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left px-3 py-2.5 text-sm text-red-600 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={handleLogin}
          className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 px-4 py-2 rounded-lg transition-all hover:border-blue-400 hover:shadow-md active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91a8.78 8.78 0 0 0 2.69-6.62z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.8.54-1.83.86-3.05.86c-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A8.99 8.99 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.96 10.71a5.41 5.41 0 0 1 0-3.42V4.96H.96a8.99 8.99 0 0 0 0 8.08l3-2.33z" fill="#FBBC05"/>
            <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.99 8.99 0 0 0 9 0C5.28 0 2.11 2.11.96 4.96L3.96 7.29A5.41 5.41 0 0 1 9 3.58z" fill="#EA4335"/>
          </svg>
          <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Continue with Google</span>
        </button>
      )}
    </div>
  );
}