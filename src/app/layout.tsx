import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import PageTransition from "@/components/PageTransition";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premium Store",
  description: "Curated selection of global brands",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // [FIX] Moved suppressHydrationWarning here to prevent the hydration error
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-clip`}>
          <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                style: {
                  marginTop: "70px",
                },
              }}
            />

            {/* [UPDATE] Added transition classes to the wrapper for a smooth theme switch */}
            <div className="flex min-h-screen flex-col overflow-x-clip bg-white text-gray-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
              <Navbar />
              {/* [FIX] Removed bg-gray-50 so the theme background shows through */}
              <main className="flex-grow overflow-x-clip">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
      </body>
    </html>
  );
}
