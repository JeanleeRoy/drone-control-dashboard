import { defineStore } from "pinia";
import { User } from "./types";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    user: {} as User,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getUserEmail: (state) => state.user.email || "",
    getUsername: (state) => state.user.name || "",
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUser(user: User) {
      this.user = user;
    },
    clear() {
      this.token = "";
      this.user = {} as User;
    },
  },
  persist: {
    storage: localStorage,
  },
});
