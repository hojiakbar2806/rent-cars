import { Dictionary } from "@/localization/getDictionary";
import { create } from "zustand";

interface DictionaryState {
  dictionary: Dictionary | null;
  setDictionary: (dict: Dictionary) => void;
}

export const useDictionaryStore = create<DictionaryState>((set) => ({
  dictionary: null,
  setDictionary: (dict) => set({ dictionary: dict }),
}));
