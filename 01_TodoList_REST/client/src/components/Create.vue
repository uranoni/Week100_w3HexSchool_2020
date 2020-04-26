<template>
  <div>
    標題：
    <input type="text" v-model="title" />
    <br />內容：
    <input type="text" v-model="text" />
    <br />
    <button @click="submitTodo">新建代辦項目</button>
  </div>
</template>

<script>
export default {
  name: "Create",
  data() {
    return {
      title: "",
      text: ""
    };
  },
  methods: {
    submitTodo() {
      this.axios
        .post("http://localhost:20201/create", {
          title: this.title,
          text: this.text
        })
        .then(res => console.log(res));
    }
  }
};
</script>

<style>
</style>