import { create } from "zustand";
import { textFormatter } from "../Internalization/textFormatter";

export const useContextStore = create((set: any, get: any) => ({
    language: "en",
    setLanguage: (language: string) => {
        set({ language })
        set({ formatText: (text: string) => textFormatter(text, language) })
    },
    formatText: (text: string) => textFormatter(text, get().language),
}));