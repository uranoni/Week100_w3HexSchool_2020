<template>
  <div>
    <ul>
      <div v-for="(todo,idx) in todos" :key="idx">
        <li>工作編號 ： {{idx}}</li>
        <li>{{todo.title}}</li>
        <li>{{todo.text}}</li>
        <li>{{todo.createdAt}}</li>
        <hr />
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      todos: []
    };
  },
  mounted() {
    this.axios.get("http://localhost:20201/findall").then(res => {
      this.todos = res.data;
      console.log(res.data);
    });
  }
};
</script>

<style>
</style>