import "@/app/globals.css";
import Navbar from "@/components/shared/Navbar";
import { FC, Suspense } from "react";


type RootLayoutProps = {
  children: React.ReactNode;
};


const layout: FC<RootLayoutProps> = async ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Suspense>
        {children}
      </Suspense>
    </div>
  )
}

export default layout
