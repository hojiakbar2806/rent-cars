import "@/app/globals.css";

import React, { FC, ReactNode } from "react";
import Navbar from "@/components/shared/navbar/Navbar";
import SessionProvider from "@/components/providers/SessionProvider";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/components/providers/QueryProvider";
import NextTopLoader from "nextjs-toploader";
import { getSession } from "../actions/auth/session";
import NotificationDrawer from "@/components/shared/NotificationDrawer";
import SidebarDrawer from "@/components/shared/SidebarDrawer";
import FilterbarDrawer from "@/components/shared/FilterbarDrawer";
import getTheme from "../actions/theme";

type Props = {
  children: ReactNode;
};

const RootLayout: FC<Props> = async ({ children }) => {
  const session = await getSession();
  const theme = await getTheme();

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Avtomobil ijarasi</title>
      </head>
      <body>
        <SessionProvider session={session}>
          <QueryProvider>
            <main className="w-full h-screen flex flex-col bg-slate-100">
              <Navbar session={session} />
              <div className="flex-1 flex flex-col overflow-scroll">
                {children}
              </div>
            </main>
            <NextTopLoader color="#3563E9" height={5} showSpinner={false} />
            <Toaster position="top-center" reverseOrder={false} />
            <NotificationDrawer />
            <SidebarDrawer />
            <FilterbarDrawer />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
