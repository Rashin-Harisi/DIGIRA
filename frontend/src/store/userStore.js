import { create } from 'zustand';

const useUserStore = create((set) => ({
    user: null, 
    role: null, 

    // Action to set user and role
    setUser: (userData) => set(() => ({
        user: userData,
        role: userData?.role || null, 
    })),

    // Action to clear user (e.g., logout)
    clearUser: () => set(() => ({
        user: null,
        role: null,
    })),
}));

export default useUserStore;
