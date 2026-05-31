import { create } from "zustand";
import { authApi } from "@/lib/api/auth";
import { User } from "@/types";

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loadCurrentUser: () => Promise<void>;
  initFromStorage: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,

  initFromStorage: () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("accessToken");
    if (token) {
      set({ accessToken: token });
      get().loadCurrentUser();
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authApi.login(email, password);
      localStorage.setItem("accessToken", data.accessToken);
      set({ accessToken: data.accessToken });
      await get().loadCurrentUser();
    } catch (err: any) {
      const message =
        err.response?.data?.message ?? "Invalid email or password";
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.register(username, email, password);
    } catch (err: any) {
      const message =
        err.response?.data?.message ?? "Registration failed";
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  loadCurrentUser: async () => {
    try {
      const { data } = await authApi.current();
      set({ user: data });
    } catch {
      set({ user: null });
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null });
  },

  clearError: () => set({ error: null }),
}));
