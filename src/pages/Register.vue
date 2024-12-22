<template>
  <v-container class="py-10">
    <h1 class="text-center mb-6">Crear Nuevo Usuario</h1>
    <v-form ref="form" @submit.prevent="register" lazy-validation>
      <v-text-field
        v-model="username"
        label="Nombre de Usuario"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="Correo Electrónico"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Contraseña"
        type="password"
        :rules="passwordRules"
        required
      ></v-text-field>
      <v-btn color="#FFECB3" type="submit">Registrar</v-btn>
      <v-btn text to="/login">Volver al Login</v-btn>
    </v-form>
    <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "RegisterPage",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const error = ref("");

    // Reglas de validación
    const emailRules = [
      (v) => !!v || "El correo electrónico es obligatorio.",
      (v) => /.+@.+\..+/.test(v) || "El correo electrónico debe ser válido.",
    ];

    const passwordRules = [
      (v) => !!v || "La contraseña es obligatoria.",
      (v) => v.length >= 8 || "La contraseña debe tener al menos 8 caracteres.",
      (v) =>
        /[A-Z]/.test(v) ||
        "La contraseña debe contener al menos una letra mayúscula.",
      (v) =>
        /[a-z]/.test(v) ||
        "La contraseña debe contener al menos una letra minúscula.",
      (v) => /\d/.test(v) || "La contraseña debe contener al menos un número.",
    ];

    const register = () => {
      try {
        authStore.registerUser({
          username: username.value,
          email: email.value,
          password: password.value,
        });
        alert("Usuario registrado exitosamente.");
        router.push("/products");
        username.value = "";
        email.value = "";
        password.value = "";
      } catch (e) {
        error.value = e.message;
      }
    };

    return {
      username,
      email,
      password,
      error,
      register,
      emailRules,
      passwordRules,
    };
  },
};
</script>
