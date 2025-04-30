import "@/app/globals.css";
import { FC } from "react";


type RootLayoutProps = {
  children: React.ReactNode;
};


const layout: FC<RootLayoutProps> = async ({ children }) => {
  return (
    <div className="min-h-screen w-full grid place-items-center">
      {children}
    </div>
  )
}

export default layout
