"use client";

import { createContext, FC, ReactNode, useState } from "react";
import { UserSession } from "@/types/session";

export interface SessionContextType {
  session: UserSession;
  setSession: (session: UserSession) => void;
}

export const SessionContext = createContext<SessionContextType | null>(null);

type Props = {
  children: ReactNode
  initialSession: UserSession
}

export const SessionProvider: FC<Props> = ({ children, initialSession }) => {
  const [session, setSession] = useState<UserSession>(initialSession);
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};