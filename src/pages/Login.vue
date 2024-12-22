<template>
  <v-container class="py-10">
    <h1 class="text-center mb-6">Iniciar Sesión</h1>
    <v-form ref="form" @submit.prevent="login" lazy-validation>
      <v-text-field
        v-model="username"
        label="Nombre de Usuario"
        required
        :rules="usernameRules"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Contraseña"
        type="password"
        required
        :rules="passwordRules"
      ></v-text-field>
      <v-btn color="#FFECB3" type="submit">Iniciar Sesión</v-btn>
      <v-btn text to="/register">Crear Nuevo Usuario</v-btn>
    </v-form>
    <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter(); // Acceder al router
    const username = ref("");
    const password = ref("");
    const error = ref("");

    // Reglas de validación
    const usernameRules = [
      (v) => !!v || "El nombre de usuario es obligatorio.",
    ];
    const passwordRules = [(v) => !!v || "La contraseña es obligatoria."];

    const login = () => {
      try {
        authStore.loginUser({
          username: username.value,
          password: password.value,
        });

        // Redirigir al usuario a /products después del login exitoso
        router.push("/products");
      } catch (e) {
        error.value = e.message;
      }
    };

    return {
      username,
      password,
      error,
      login,
      usernameRules,
      passwordRules,
    };
  },
};
</script>
