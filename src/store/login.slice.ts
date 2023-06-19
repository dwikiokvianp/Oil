import { create } from "zustand";

interface LoginStore {
  isAdmin: boolean;
  role: "ADMIN" | "USER" | "OFFICER" | "ADMIN_PUSAT" | "";
  setReverse: () => void;
  reset: () => void;
  setRole: (role: "ADMIN" | "OFFICER" | "USER" | "ADMIN_PUSAT") => void;
}
export const useLoginStore = create<LoginStore>((set) => ({
  isAdmin: true,
  role: "",
  setRole: (myRole) => set(() => ({ role: myRole })),
  setReverse: () => set((state) => ({ isAdmin: !state.isAdmin })),
  reset: () => set({ isAdmin: true }),
}));
