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
import { useCartStore } from "@/stores/cartStore";

export default {
  name: "HeaderPage",
  setup() {
    const searchQuery = ref("");
    const router = useRouter();

    const cartStore = useCartStore();

    const cartItemCount = computed(() => {
      return cartStore.cart.reduce((total, item) => total + item.quantity, 0);
    });

    const searchProducts = () => {
      if (searchQuery.value.trim()) {
        router.push({
          path: "/products",
          query: { name: searchQuery.value.trim() },
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
