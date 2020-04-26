<template>
  <div id="app">
    <Home />
    <Create />
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import Create from "./components/Create";
export default {
  name: "App",
  components: {
    Home,
    Create
  }
};
</script>

<style>
</style>
