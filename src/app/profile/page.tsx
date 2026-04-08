"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";

export default function ProfilePage() {
  // Static user data for now
  const user = {
    name: "Abdul Samad",
    email: "abdulsamad@example.com",
    memberSince: "April 2026",
    avatar: "AS",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="text-gray-500 flex items-center hover:text-blue-600 transition-colors mb-8"
      >
        <ArrowLeft size={18} className="mr-2" /> Back to Shopping
      </Link>

      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        {/* Header/Banner */}
        <div className="h-32 bg-blue-600"></div>

        <div className="px-8 pb-8">
          {/* Profile Info */}
          <div className="relative flex justify-between items-end -mt-12 mb-8">
            <div className="h-24 w-24 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center text-3xl font-black text-blue-600">
              {user.avatar}
            </div>
            <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all">
              Edit Profile
            </button>
          </div>

          <div>
            <h1 className="text-3xl font-black text-gray-900">{user.name}</h1>
            <p className="text-gray-500 font-medium">{user.email}</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">
              Member Since {user.memberSince}
            </p>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <button className="flex items-center p-4 rounded-2xl border border-gray-100 hover:border-blue-600 hover:bg-blue-50 transition-all group text-left">
              <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-100 text-gray-600 group-hover:text-blue-600 transition-all">
                <Package size={22} />
              </div>
              <div className="ml-4">
                <p className="font-bold text-gray-900">My Orders</p>
                <p className="text-xs text-gray-400">
                  Track, return, or buy things again
                </p>
              </div>
            </button>

            <button className="flex items-center p-4 rounded-2xl border border-gray-100 hover:border-blue-600 hover:bg-blue-50 transition-all group text-left">
              <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-100 text-gray-600 group-hover:text-blue-600 transition-all">
                <MapPin size={22} />
              </div>
              <div className="ml-4">
                <p className="font-bold text-gray-900">Addresses</p>
                <p className="text-xs text-gray-400">
                  Edit addresses for orders
                </p>
              </div>
            </button>

            <button className="flex items-center p-4 rounded-2xl border border-gray-100 hover:border-blue-600 hover:bg-blue-50 transition-all group text-left">
              <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-100 text-gray-600 group-hover:text-blue-600 transition-all">
                <Settings size={22} />
              </div>
              <div className="ml-4">
                <p className="font-bold text-gray-900">Account Settings</p>
                <p className="text-xs text-gray-400">
                  Update password and security
                </p>
              </div>
            </button>

            <button className="flex items-center p-4 rounded-2xl border border-gray-50 hover:bg-red-50 hover:border-red-100 transition-all group text-left">
              <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-red-100 text-gray-400 group-hover:text-red-500 transition-all">
                <LogOut size={22} />
              </div>
              <div className="ml-4">
                <p className="font-bold text-gray-900">Logout</p>
                <p className="text-xs text-gray-400">
                  Sign out of your account
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
