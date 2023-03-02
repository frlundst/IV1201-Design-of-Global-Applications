import { create } from "zustand";
import { Person } from "../Types/Person";

export const usePersonStore = create((set, get) => ({
    token: null,
    person: null,
    setPerson: (person: Person) => set({ person }),
    setToken: (token: string) => set({ token }),
    clear: () => set({ token: null, person: null }),
}));