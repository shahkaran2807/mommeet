import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/sonner";
import IdeasAccordian from "./components/IdeasAccordian";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RentEasy",
  description: "Your ultimate marketplace to rent anything!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex flex-col min-h-screen px-8 sm:px-36">
            <HeaderNav />
            {children}
          </div>
          <Toaster />
          {/* <div className="flex flex-col px-8 sm:px-36">
          <IdeasAccordian/>
          </div> */}
         
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
