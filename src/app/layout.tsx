import type {Metadata} from "next";
import {Epilogue} from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const epilogue = Epilogue({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`{epilogue.className} relative overflow-x-hidden`}>
        <Navbar />
        <main>
          
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
