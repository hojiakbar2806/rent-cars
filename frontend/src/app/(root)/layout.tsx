import "@/app/globals.css";

import { FC, ReactNode } from "react";
import Provider from "@/components/providers/Provider";
import { Navbar } from "@/components/shared/navbar";

type Props = {
  children: ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Car Rental</title>
      </head>
      <body className="">
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
