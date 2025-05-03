import "@/app/globals.css";
import { FC } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";


export const metadata: Metadata = {
  title: "54-Shopping",
  description: "A simple e-commerce site",
};

type RootLayoutProps = {
  children: React.ReactNode;
};


const layout: FC<RootLayoutProps> = async ({ children }) => {
  return (
    <main className="w-full bg-slate-100">
        <Navbar />
        {children}
        <Footer />
    </main>
  )
}

export default layout
