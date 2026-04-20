"use client";

import useAdminAuth from "@/hooks/useAdminAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, isAdmin } = useAdminAuth();

  // 🔐 Global protection for ALL admin pages
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking admin access...
      </div>
    );
  }

  if (!isAdmin) {
    return null; // hook already redirects
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Top Admin Bar */}
      <div className="p-4 border-b bg-white dark:bg-slate-900">
        <h1 className="font-bold text-lg">Admin Panel</h1>
      </div>

      {/* Page Content */}
      <div className="p-6">{children}</div>
    </div>
  );
}
