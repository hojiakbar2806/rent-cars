"use client";

import { createContext, ReactNode, useEffect } from "react";
import { UserSession } from "@/types/session";

export interface SessionContextType {
  session: UserSession;
  setSession: (session: UserSession) => void;
}

export const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children, session }: { children: ReactNode, session: UserSession }) => {
  useEffect(() => {
    if (session) {
      document.cookie = `session=${encodeURIComponent(JSON.stringify(session))}; path=/; max-age=1800; secure; sameSite=strict`;
    }
  }, [session]);

  const setSession = (userSession: UserSession) => {
    document.cookie = `session=${encodeURIComponent(JSON.stringify(userSession))}; path=/; max-age=1800; secure; sameSite=strict`;
  };

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};