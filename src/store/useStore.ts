import { create } from "zustand";

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    clearUser: () => void;
}

const useStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) => set({ user, isAuthenticated: true }),

    clearUser: () => set({ user: null, isAuthenticated: false }),
}));

export default useStore;