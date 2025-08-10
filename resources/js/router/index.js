import { createRouter, createWebHistory } from 'vue-router'
import Login from '../Components/Auth/Login.vue'
import Register from '../Components/Auth/Register.vue'
import Dashboard from '../Pages/Dashboard.vue'
import Posts from '../Pages/Posts.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
  { path: '/posts', component: Posts },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
