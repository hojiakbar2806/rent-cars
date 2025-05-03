import "@/app/globals.css";
import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "@/components/providers/QueryProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";




type RootLayoutProps = {
    children: ReactNode;
};

const layout: FC<RootLayoutProps> = async ({ children }) => {

    return (
        <html>
            <body className="w-full">
                <SessionProvider>
                        <QueryProvider>
                            {children}
                            <Toaster />
                            <NextTopLoader color="#3563E9" height={4} showSpinner={false} />
                        </QueryProvider>
                </SessionProvider>
            </body>
        </html>
    )
}

export default layout