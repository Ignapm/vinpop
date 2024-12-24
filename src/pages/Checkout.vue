<template>
  <v-container class="py-10">
    <h1 class="text-center mb-6">Tu Carrito</h1>
    <v-row v-if="cartItems.length">
      <v-col cols="12">
        <v-data-table
          :items="cartItems"
          :headers="headers"
          item-value="id"
          class="elevation-1"
        >
          <template v-slot:[`item.price`]="{ item }">
            <span>{{ formatPrice(item.price) }}</span>
          </template>
          <template v-slot:[`item.quantity`]="{ item }">
            <div class="d-flex align-center">
              <v-btn
                icon
                small
                @click="updateQuantity(item, item.quantity - 1)"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <span class="mx-2">{{ item.quantity }}</span>
              <v-btn
                icon
                small
                @click="updateQuantity(item, item.quantity + 1)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="red" text @click="removeFromCart(item)">
              Eliminar
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12" class="text-right mt-6">
        <h2>Total: {{ formatPrice(totalPrice) }}</h2>
        <v-btn color="primary" large>Finalizar Compra</v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <p class="text-center">Tu carrito está vacío</p>
    </v-row>
  </v-container>
</template>

<script>
import { computed } from "vue";
import { useCartStore } from "@/stores/cartStore";

export default {
  name: "CheckoutPage",
  setup() {
    const cartStore = useCartStore();

    const cartItems = computed(() => cartStore.cart);

    const totalPrice = computed(() => {
      return cartItems.value.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    });

    const updateQuantity = (item, quantity) => {
      if (quantity <= 0) {
        cartStore.removeFromCart(item.id);
      } else {
        cartStore.updateQuantity(item.id, quantity);
      }
    };

    const removeFromCart = (item) => {
      cartStore.removeFromCart(item.id);
    };

    const formatPrice = (price) => {
      return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(price);
    };

    const headers = [
      { text: "Producto", value: "name" },
      { text: "Precio", value: "price" },
      { text: "Cantidad", value: "quantity" },
      { text: "Acciones", value: "actions", sortable: false },
    ];

    return {
      cartItems,
      totalPrice,
      headers,
      updateQuantity,
      removeFromCart,
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

h2 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #555;
}
</style>
