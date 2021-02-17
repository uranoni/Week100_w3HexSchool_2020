<template>
  <div>
    login
    <input type="text" v-model="name" />
    <button @click="setToken">送出</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    setToken() {
      this.axios
        .post(`http://localhost:20201/verifyUser`, { name: this.name })
        .then(res => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
        });
    }
  }
};
</script>

<style>
</style>