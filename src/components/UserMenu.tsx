"use client";

import Link from "next/link";
import { User as FirebaseUser } from "firebase/auth";
import {
  User as UserIcon,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

interface UserMenuProps {
  isOpen: boolean;
  user: FirebaseUser | null;
  onLogout: () => void;
  onClose: () => void;
}

export default function UserMenu({ isOpen, user, onLogout, onClose }: UserMenuProps) {
  if (!user) return null; // Should not happen if AuthButton renders this only when user exists

  return (
    <div
      onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      className={`absolute top-full right-0 mt-3 w-60 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-2xl rounded-2xl py-2 z-50 transition-all duration-300 ease-out
        ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}
      `}
    >
      <div className="px-4 py-3 border-b border-gray-50 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 rounded-t-2xl">
        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tight">
          Signed in as
        </p>
        <p className="text-xs font-medium text-gray-900 dark:text-gray-200 truncate">
          {user.email}
        </p>
      </div>

      <div className="p-1">
        <Link
          href="/profile"
          onClick={onClose} // Close on navigation
          className="flex items-center gap-2 w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 rounded-lg transition-colors"
        >
          <UserIcon size={16} />
          My Profile
        </Link>

        <Link
          href="/orders"
          onClick={onClose}
          className="flex items-center gap-2 w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 rounded-lg transition-colors"
        >
          <Package size={16} />
          My Orders
        </Link>

        <Link
          href="/settings"
          onClick={onClose}
          className="flex items-center gap-2 w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 rounded-lg transition-colors"
        >
          <Settings size={16} />
          Account Settings
        </Link>
      </div>

      <div className="p-1 border-t border-gray-50 dark:border-slate-800">
        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="flex items-center gap-2 w-full text-left px-3 py-2.5 text-sm text-red-600 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
}