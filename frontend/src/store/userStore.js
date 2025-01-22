import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  role: null,
  token: localStorage.getItem("authToken") || null,
  email: null,

  // Action to set user and role
  setUser: (userData) =>
    set(() => ({
      user: userData,
      role: userData?.role || null,
    })),
    setEmail: (email) =>
        set(() => ({
          email: email
        })),

  setToken: (token) =>
    set(() => {
      localStorage.setItem("authToken", token); // Save token to local storage
      return { token }; // Update token in Zustand store
    }),

  logout: () => {
    localStorage.removeItem("authToken");
    set({ user: null, token: null });
  },

  // Action to clear user (e.g., logout)
  clearUser: () =>
    set(() => ({
      user: null,
      role: null,
    })),
}));

export default useUserStore;
