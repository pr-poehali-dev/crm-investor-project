import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUserId: (userId: number) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      userId: null,
      
      setTokens: (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        set({ accessToken, refreshToken });
      },
      
      setUserId: (userId) => set({ userId }),
      
      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({ accessToken: null, refreshToken: null, userId: null });
      },
      
      isAuthenticated: () => {
        const state = get();
        return !!state.accessToken;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
