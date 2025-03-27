"use client";

import { useSessionStore } from "@/hooks/useSessionStore";
import { UserSession } from "@/types/session";
import { FC, Fragment, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  session: UserSession;
};

const SessionProvider: FC<Props> = ({ children, session }) => {
  useEffect(() => useSessionStore.getState().setSession(session), [session]);
  return <Fragment>{children}</Fragment>;
};

export default SessionProvider;
