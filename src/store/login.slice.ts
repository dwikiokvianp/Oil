import { create } from "zustand";

interface LoginStore {
  isAdmin: boolean;
  setReverse: () => void;
  reset: () => void;
}
export const useLoginStore = create<LoginStore>((set) => ({
  isAdmin: true,
  setReverse: () => set((state) => ({ isAdmin: !state.isAdmin })),
  reset: () => set({ isAdmin: true }),
}));
