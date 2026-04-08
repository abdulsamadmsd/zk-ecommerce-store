import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast"; // [UPDATE] Import this
import PageTransition from "@/components/PageTransition";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <CartProvider>
          {/* [UPDATE] Add Toaster here */}
          {/* <Toaster position="bottom-right" reverseOrder={false} /> */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              // This style ensures it appears below the navbar (approx 80px down)
              className: "",
              style: {
                marginTop: "70px",
              },
            }}
          />

          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
