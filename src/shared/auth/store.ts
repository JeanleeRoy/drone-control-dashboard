import { defineStore } from "pinia";
import { AuthPayload, User } from "./types";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    expires: 0,
    user: {} as User,
  }),
  getters: {
    isAuthenticated: (state) => {
      if (state.expires === 0) return false;
      const expires = Number(state.expires) * 1000;
      const now = Date.now();
      return expires > now;
    },
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getUserEmail: (state) => state.user.email || "",
    getUsername: (state) => state.user.name || "",
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setExpires(expires: number) {
      this.expires = expires;
    },
    setUser(payload: User | AuthPayload) {
      const { userId, email, name, role } = payload;
      this.user = { userId, email, name, role };
    },
    clear() {
      this.token = "";
      this.expires = 0;
      this.user = {} as User;
    },
  },
  persist: {
    storage: localStorage,
  },
});
