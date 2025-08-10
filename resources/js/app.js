import { createApp } from 'vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Dashboard from './views/Dashboard.vue'
import Home from './views/Home.vue'
import Posts from './Pages/Posts.vue'
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true;


axios.defaults.baseURL = '/'


const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/posts', component: Posts, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
];


const router = createRouter({
    history: createWebHistory(),
    routes
})

// Optional: Navigation guard to check auth
router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token')
    
    if (to.meta.requiresAuth && !token) {
        next('/login')
    } else if ((to.path === '/login' || to.path === '/register') && token) {
        next('/')
    } else {
        next()
    }
})

const app = createApp({
  template: '<div><router-view /></div>'
})
app.use(router)
app.mount('#app')
