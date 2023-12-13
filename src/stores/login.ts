import { defineStore } from 'pinia';
const storeName = 'login';
export const useLoginStore = defineStore(storeName, {
  state: (): {
    token: string | null;
  } => {
    const token = localStorage.getItem(storeName);
    return {
      token: token,
    };
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem(storeName, token);
    },
    deleteToken() {
      this.token = null;
      localStorage.removeItem(storeName);
    },
  },
});
