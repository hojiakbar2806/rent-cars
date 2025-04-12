import "@/app/globals.css";

import React, { FC, ReactNode } from "react";
import { SessionProvider } from "@/components/providers/SessionProvider";
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

  console.log(session)

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Avtomobil ijarasi</title>
      </head>
      <body className="text-foreground bg-slate-100">
        <SessionProvider session={session}>
          <QueryProvider>
            <main className="w-full h-screen flex flex-col bg-slate-100">{children}</main>
            <NextTopLoader color="#3563E9" height={4} showSpinner={false} />
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
