<template>
  <div>
    <ul>
      <div v-for="(todo,idx) in todos" :key="idx">
        <li>工作編號 ： {{idx}}</li>
        <li>{{todo.title}}</li>
        <li>{{todo.text}}</li>
        <li>{{todo.createdAt}}</li>
        <br />新標題
        <input type="text" v-model="newTitle" />
        <br />新內容
        <input type="text" v-model="newText" />
        <button @click="updateTask(todo._id)">更新此項目</button>
        <br />
        <button @click="removeTask(todo._id)">刪除此項目</button>
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
      todos: [],
      newTitle: "",
      newText: ""
    };
  },
  mounted() {
    this.axios.get("http://localhost:20201/findall").then(res => {
      this.todos = res.data;
      console.log(res.data);
    });
  },
  methods: {
    removeTask(id) {
      this.axios.delete(`http://localhost:20201/removeTask/${id}`).then(res => {
        console.log(res);
      });
    },
    updateTask(id) {
      this.axios.patch(`http://localhost:20201/updateTask/${id}`, {
        newTitle: this.newTitle,
        newText: this.newText
      });
    }
  }
};
</script>

