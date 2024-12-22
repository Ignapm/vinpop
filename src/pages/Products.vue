<template>
  <v-container class="py-10">
    <h1 class="text-center mb-6">
      Explora nuestros productos de
      {{
        type === "buy"
          ? "Compra"
          : type === "rent"
          ? "Alquiler"
          : "Compra y Alquiler"
      }}
    </h1>
    <v-row>
      <v-col
        cols="12"
        md="4"
        v-for="product in filteredProducts"
        :key="product.id"
      >
        <v-card>
          <v-img :src="product.image" height="200px" class="mb-4" />
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-text>
            {{ product.description }}
          </v-card-text>
          <v-card-subtitle class="text-primary">
            Precio: {{ formatPrice(product.price) }}
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" @click="viewProduct(product.id)">
              Ver más
            </v-btn>
            <span class="ml-4">{{ product.type }}</span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useProductsStore } from "@/stores/productsStore";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "ProductsList",
  setup() {
    const productsStore = useProductsStore();
    const route = useRoute();
    const router = useRouter();

    // Obtener el tipo desde la ruta
    const type = computed(() => route.query.type);
    const searchQuery = computed(() => route.query.name || "");

    // Filtrar productos según tipo y nombre de búsqueda
    const filteredProducts = computed(() => {
      let products = [];
      if (type.value === "buy") {
        products = productsStore.getBuyProducts;
      } else if (type.value === "rent") {
        products = productsStore.getRentProducts;
      } else {
        products = [
          ...productsStore.getBuyProducts,
          ...productsStore.getRentProducts,
        ];
      }

      // Filtrar por búsqueda si existe searchQuery
      if (searchQuery.value) {
        products = products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      return products;
    });

    const viewProduct = (id) => {
      router.push(`/product/${id}`);
    };

    // Formatear precio en euros
    const formatPrice = (price) => {
      return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(price);
    };

    return {
      type,
      filteredProducts,
      viewProduct,
      formatPrice,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}
v-card {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
v-card-subtitle {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
