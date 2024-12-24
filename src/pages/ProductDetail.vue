<template>
  <v-container class="py-10">
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          :src="product?.image"
          height="400px"
          class="mb-4"
          v-if="product"
          :alt="product?.name"
        />
        <p v-else>Cargando imagen...</p>
      </v-col>
      <v-col cols="12" md="6">
        <h1 v-if="product">{{ product?.name }}</h1>
        <p v-if="product">{{ product?.description }}</p>
        <h2 v-if="product">Precio: {{ formattedPrice }}</h2>
        <v-btn
          :color="isBuy ? 'primary' : 'secondary'"
          class="mr-4"
          @click="addToCart"
          v-if="product"
        >
          {{ isBuy ? "Comprar" : "Alquilar" }}
        </v-btn>
        <v-btn color="grey" @click="goToCheckout" v-if="product">
          Ir al Checkout
        </v-btn>
        <p v-else>Cargando producto...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductsStore } from "@/stores/productsStore";
import { useCartStore } from "@/stores/cartStore";

export default {
  name: "ProductDetail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const productsStore = useProductsStore();
    const cartStore = useCartStore();

    const productId = parseInt(route.params.id);
    const product = computed(() =>
      productsStore.getBuyProducts
        .concat(productsStore.getRentProducts)
        .find((p) => p.id === productId)
    );

    if (!product.value) {
      console.error("Producto no encontrado");
      return {};
    }

    const isBuy = computed(() => product.value?.type === "Compra");

    const formattedPrice = computed(() => {
      return product.value
        ? new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR",
          }).format(product.value.price)
        : "Precio no disponible";
    });

    const addToCart = () => {
      if (product.value) {
        cartStore.addToCart({
          id: product.value.id,
          name: product.value.name,
          price: product.value.price,
          type: product.value.type,
        });
        alert(
          `Producto añadido al carrito como ${
            isBuy.value ? "compra" : "alquiler"
          }`
        );
      }
    };

    const goToCheckout = () => {
      router.push("/checkout");
    };

    return {
      product,
      isBuy,
      formattedPrice,
      addToCart,
      goToCheckout,
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

h2 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #555;
}

p {
  font-size: 1.2rem;
  color: #555;
}

v-img {
  border-radius: 8px;
}
</style>
