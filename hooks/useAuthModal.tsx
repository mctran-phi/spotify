import { ViewType } from "@supabase/auth-ui-shared";
import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  view: ViewType | undefined;
  onLogin: () => void;
  onSignUp: () => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  view: undefined,
  onLogin: () => set({ isOpen: true, view: "sign_in" }),
  onSignUp: () => set({ isOpen: true, view: "sign_up" }),
  onClose: () => set({ isOpen: false})
}));

export default useAuthModal;
