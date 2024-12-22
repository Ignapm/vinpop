<template>
  <v-footer app padless>
    <v-col
      class="text-center"
      cols="12"
      style="background-color: #ffe082; padding: 1rem"
    >
      © {{ new Date().getFullYear() }} VinPop. Todos los derechos reservados.
    </v-col>
  </v-footer>
</template>

<style scoped>
.app-footer {
  background-color: var(--color-primary);
  color: white;
}
</style>
