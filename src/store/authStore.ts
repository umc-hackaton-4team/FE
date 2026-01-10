import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "../types/user";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      login: (accessToken, refreshToken) =>
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),

      setAccessToken: (accessToken) => set({ accessToken }),

      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
