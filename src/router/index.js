import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Products from "@/pages/Products.vue";
import ProductDetail from "@/pages/ProductDetail.vue";
import Checkout from "@/pages/Checkout.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/products", name: "Products", component: Products },
  { path: "/product/:id", name: "ProductDetail", component: ProductDetail },
  { path: "/checkout", name: "Checkout", component: Checkout },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
