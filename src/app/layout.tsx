import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import PageTransition from "@/components/PageTransition";
import { ThemeProvider } from "@/components/ThemeProvider";

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
      <body className={inter.className}>
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
            <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white transition-colors duration-500">
              <Navbar />
              {/* [FIX] Removed bg-gray-50 so the theme background shows through */}
              <main className="flex-grow">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
