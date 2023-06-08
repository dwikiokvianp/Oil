import { create } from "zustand";

interface IdStore {
  id: number | null;
  makeIdTo: (id: number) => void;
  nullId: () => void;
}

export const useIdStore = create<IdStore>((set) => ({
  id: 0,
  makeIdTo: (id: number) => set({ id }),
  nullId: () => set({ id: null }),
}));
