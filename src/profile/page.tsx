"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  MapPin,
  Settings,
  LogOut,
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Globe,
} from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "Abdul Samad",
    role: "Frontend Architect | React & TypeScript Specialist",
    email: "abdulsamad@example.com",
    location: "Islamabad, Pakistan",
    education: "BS in Computer Science (Gomal University)",
    bio: "Frontend is where logic meets creativity. Crafting scalable, production-ready interfaces.",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-500">
      {/* Top Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link
          href="/"
          className="text-gray-500 dark:text-slate-400 flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Shopping
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors">
         
          <div className="relative h-20 md:h-50 w-full bg-gray-200 dark:bg-slate-800">
            <Image
              src="/cover-pic.jpg"
              alt="Cover"
              fill
              sizes="(max-width: 768px) 100vw, 176px"
              className="object-cover" // Changed to cover for better fit
              priority
            />
          </div>

         
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20 mb-6 gap-6">
             
              <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white dark:border-slate-900 shadow-xl overflow-hidden bg-white dark:bg-slate-800">
                <Image
                  src="/profile-pic.jpg"
                  alt="Profile"
                  fill
                  sizes="(max-width: 768px) 100vw, 176px"
                  className="object-cover"
                />
              </div>

             
              <div className="text-center md:text-left md:pb-4 flex-1">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                  {user.name}
                </h1>
                <p className="text-blue-600 dark:text-blue-400 font-bold">
                  {user.role}
                </p>
              </div>

            
              <div className="flex gap-2 md:pb-4">
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 dark:shadow-none">
                  Edit Profile
                </button>
                <button className="bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-slate-700 transition-all border border-transparent dark:border-slate-700">
                  <Settings size={18} />
                </button>
              </div>
            </div>

            <div className="h-px bg-gray-100 dark:bg-slate-800 w-full mb-6"></div>

           
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-500 dark:text-slate-400 font-medium">
              <div className="flex items-center">
                <Briefcase
                  size={16}
                  className="mr-2 text-gray-400 dark:text-slate-500"
                />{" "}
                Software Engineer
              </div>
              <div className="flex items-center">
                <MapPin
                  size={16}
                  className="mr-2 text-gray-400 dark:text-slate-500"
                />{" "}
                {user.location}
              </div>
              <div className="flex items-center">
                <Globe
                  size={16}
                  className="mr-2 text-gray-400 dark:text-slate-500"
                />{" "}
                English, Urdu, Pashto
              </div>
            </div>
          </div>
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
         
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
              <h2 className="text-lg font-black text-gray-900 dark:text-white mb-4">
                Intro
              </h2>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-6 text-center italic">
                "{user.bio}"
              </p>
              <ul className="space-y-4 text-sm text-gray-600 dark:text-slate-400">
                <li className="flex items-start">
                  <GraduationCap
                    size={18}
                    className="mr-3 text-gray-400 dark:text-slate-500 shrink-0"
                  />
                  <span>
                    Studied at{" "}
                    <strong className="text-gray-900 dark:text-white">
                      {user.education}
                    </strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <MapPin
                    size={18}
                    className="mr-3 text-gray-400 dark:text-slate-500 shrink-0"
                  />
                  <span>
                    Lives in{" "}
                    <strong className="text-gray-900 dark:text-white">
                      {user.location}
                    </strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

     
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                className="flex items-center p-5 rounded-2xl
               bg-white dark:bg-slate-900 border border-gray-100
                dark:border-slate-800 hover:border-blue-600 dark:hover:border-blue-500
                 hover:shadow-md transition-all group text-left"
              >
                <div
                  className="p-3 bg-blue-50 dark:bg-blue-900/20
                 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600
                  dark:group-hover:bg-blue-600 group-hover:text-white transition-all"
                >
                  <Package size={22} />
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900 dark:text-white">
                    My Orders
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500">
                    View your purchase history
                  </p>
                </div>
              </button>

              <button className="flex items-center p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-md transition-all group text-left">
                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl text-gray-600 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Settings size={22} />
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900 dark:text-white">
                    Account
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500">
                    Security & Privacy
                  </p>
                </div>
              </button>

              <button className="flex items-center p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:bg-red-50 dark:hover:bg-red-900/10 hover:border-red-100 dark:hover:border-red-900/30 transition-all group text-left">
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-500 transition-all">
                  <LogOut size={22} />
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900 dark:text-white">
                    Logout
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500">
                    Sign out of session
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
