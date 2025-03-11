"use client";

import { FC } from "react";
import QueryProvider from "./QueryProvider";
import NextTopLoader from "nextjs-toploader";

type Props = {
  children: React.ReactNode;
};

const Provider: FC<Props> = ({ children }) => (
  <QueryProvider>
    {children}
    <NextTopLoader color="#3563E9" height={5} showSpinner={false} />
  </QueryProvider>
);

export default Provider;
