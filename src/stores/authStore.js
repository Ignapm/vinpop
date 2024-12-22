import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    users: [], // Lista de usuarios registrados
    currentUser: null, // Usuario actualmente autenticado
  }),
  actions: {
    registerUser(user) {
      // Verificar si el usuario ya existe
      const exists = this.users.some((u) => u.username === user.username);
      if (exists) {
        throw new Error("El nombre de usuario ya está en uso.");
      }
      this.users.push(user);
    },
    loginUser({ username, password }) {
      // Verificar credenciales
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
