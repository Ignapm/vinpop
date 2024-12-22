<template>
  <v-app-bar app color="#e2a548" dark>
    <v-toolbar-title>VinPop</v-toolbar-title>
    <v-spacer />
    <v-btn to="/">Inicio</v-btn>
    <v-btn :to="{ path: '/products', query: { type: 'buy' } }">Compra</v-btn>
    <v-btn :to="{ path: '/products', query: { type: 'rent' } }">Alquila</v-btn>

    <!-- Buscador -->
    <v-text-field
      label="Buscar producto"
      v-model="searchQuery"
      @input="searchProducts"
      solo
      clearable
    />

    <!-- Botón de Carrito -->
    <v-btn icon to="/checkout">
      <v-badge
        :content="cartItemCount"
        color="red"
        overlap
        v-if="cartItemCount > 0"
      >
        <v-icon>mdi-cart</v-icon>
      </v-badge>
      <v-icon v-else>mdi-cart-outline</v-icon>
    </v-btn>

    <v-btn icon to="/login">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cartStore"; // Importa tu store del carrito

export default {
  name: "HeaderPage",
  setup() {
    const searchQuery = ref(""); // Estado del input del buscador
    const router = useRouter(); // Enlace de router para navegar a /products con resultados filtrados

    // Acceso al estado del carrito desde el store
    const cartStore = useCartStore();

    // Computed property para contar los artículos en el carrito
    const cartItemCount = computed(() => {
      return cartStore.cart.reduce((total, item) => total + item.quantity, 0);
    });

    // Función para manejar la búsqueda
    const searchProducts = () => {
      if (searchQuery.value.trim()) {
        router.push({
          path: "/products",
          query: { name: searchQuery.value.trim() }, // Filtrar productos por nombre
        });
      }
    };

    return {
      searchQuery,
      searchProducts,
      cartItemCount,
    };
  },
};
</script>

<style scoped>
.app-header {
  background-color: var(--color-primary);
  color: white;
}
</style>
