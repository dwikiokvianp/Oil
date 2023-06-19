import { create } from "zustand";

interface LoginStore {
  isAdmin: boolean;
  role: "ADMIN_SALES" | "USER" | "OFFICER" | "ADMIN_PUSAT" | "";
  setReverse: () => void;
  reset: () => void;
  setRole: (role: "ADMIN_SALES" | "OFFICER" | "USER" | "ADMIN_PUSAT") => void;
}
export const useLoginStore = create<LoginStore>((set) => ({
  isAdmin: true,
  role: "",
  setRole: (myRole) => set(() => ({ role: myRole })),
  setReverse: () => set((state) => ({ isAdmin: !state.isAdmin })),
  reset: () => set({ isAdmin: true }),
}));
