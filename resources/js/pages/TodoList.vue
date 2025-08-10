<template>
  <div class="max-w-lg mx-auto bg-white shadow p-6 rounded space-y-4">
    <h2 class="text-2xl font-bold text-center">ToDo List</h2>

    <form @submit.prevent="addTodo">
      <input
        v-model="newTask"
        placeholder="Add new task"
        class="border p-2 rounded w-full"
      />
    </form>

    <ul class="space-y-2">
      <li v-for="todo in todos" :key="todo.id" class="flex justify-between items-center">
        <span :class="{ 'line-through text-gray-400': todo.completed }">
          {{ todo.title }}
        </span>
        <div class="space-x-2">
          <button @click="toggle(todo)" class="text-sm text-blue-600">Toggle</button>
          <button @click="remove(todo.id)" class="text-sm text-red-600">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const newTask = ref('');
const todos = ref([]);

const fetchTodos = async () => {
  const res = await axios.get('/api/todos');
  todos.value = res.data;
};

const addTodo = async () => {
  if (!newTask.value.trim()) return;
  const res = await axios.post('/api/todos', { title: newTask.value });
  todos.value.push(res.data);
  newTask.value = '';
};

const toggle = async (todo) => {
  todo.completed = !todo.completed;
  await axios.put(`/api/todos/${todo.id}`, todo);
};

const remove = async (id) => {
  await axios.delete(`/api/todos/${id}`);
  todos.value = todos.value.filter(t => t.id !== id);
};

onMounted(fetchTodos);
</script>
