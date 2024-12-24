import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    users: [],
    currentUser: null,
  }),
  actions: {
    registerUser(user) {
      const exists = this.users.some((u) => u.username === user.username);
      if (exists) {
        throw new Error("El nombre de usuario ya está en uso.");
      }
      this.users.push(user);
    },
    loginUser({ username, password }) {
      const user = this.users.find(
        (u) => u.username === username && u.password === password
      );
      if (!user) {
        throw new Error("Credenciales inválidas.");
      }
      this.currentUser = user;
    },
    logout() {
      this.currentUser = null;
    },
  },
});
