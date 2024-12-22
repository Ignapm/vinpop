import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
  }),
  getters: {
    getCartItems: (state) => state.cart,
    getTotalPrice: (state) =>
      state.cart.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
      ),
  },
  actions: {
    addToCart(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1; // Incrementar cantidad si ya existe
      } else {
        this.cart.push({ ...product, quantity: 1 }); // Agregar con cantidad inicial
      }
    },
    clearCart() {
      this.cart = [];
    },
    updateQuantity(productId, quantity) {
      const product = this.cart.find((item) => item.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter((item) => item.id !== productId);
    },
  },
});
