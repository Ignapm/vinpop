<template>
  <v-container class="text-center py-10">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1>Pon en alquiler tus looks favoritos</h1>
        <p class="text-body-1">
          Rentabiliza esas prendas olvidadas en el armario y dale una segunda
          oportunidad.
        </p>
        <v-btn color="#FFECB3" large @click="goToProducts"
          >Explorar Productos</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    goToProducts() {
      this.$router.push("/products");
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #555;
}
</style>
