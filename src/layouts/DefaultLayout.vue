<template>
  <v-app>
    <!-- Encabezado -->
    <AppHeader />

    <!-- Contenido Principal -->
    <v-main>
      <slot />
    </v-main>

    <!-- Pie de Página -->
    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style scoped>
v-main {
  background-color: #f8f9fa;
  min-height: 100vh;
}
</style>
