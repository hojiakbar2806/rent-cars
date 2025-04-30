import { LocaleContext, LocaleContextType } from "@/context/localeContext";
import { useContext } from "react";


export const useDictionary = (): LocaleContextType => {
    const context = useContext(LocaleContext);
    if (!context) { throw new Error("useDictionary must be used within a LocaleProvider"); }
    return context;
};