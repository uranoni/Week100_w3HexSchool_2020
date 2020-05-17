<template>
  <div id="app">
    <div v-if="!token">
      <Login />
    </div>
    <div v-else>
      <Home />
      <Create />
    </div>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import Create from "./components/Create";
import Login from "./components/Login";
export default {
  name: "App",
  components: {
    Home,
    Create,
    Login
  },
  data() {
    return {
      token: false
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
  }
};
</script>

<style>
</style>
