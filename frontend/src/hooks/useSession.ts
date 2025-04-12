import { SessionContext, SessionContextType } from "@/components/providers/SessionProvider";
import { useContext } from "react";

export const useSession = (): SessionContextType => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
};