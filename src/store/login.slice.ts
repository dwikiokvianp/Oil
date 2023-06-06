import { create } from "zustand";

interface LoginStore {
  isAdmin: boolean;
  setReverse: () => void;
}
export const useLoginStore = create<LoginStore>((set) => ({
  isAdmin: true,
  setReverse: () => set((state) => ({ isAdmin: !state.isAdmin })),
}));
