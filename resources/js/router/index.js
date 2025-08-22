import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue' // Updated path to views directory
import Register from '../components/Register.vue' // Assuming Register remains in components
import Dashboard from '../views/Dashboard.vue' // Updated path to views directory
import Home from '../views/Home.vue' // Added Home component
import Posts from '../pages/Posts.vue'

const routes = [
  { path: '/', component: Home }, // Route for the home page
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } }, // Protected route
  { path: '/posts', component: Posts, meta: { requiresAuth: true } }, // Protected route
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard to check authentication status
router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token')
    
    if (to.meta.requiresAuth && !token) {
        // If route requires auth and no token, redirect to login
        next('/login')
    } else if ((to.path === '/login' || to.path === '/register') && token) {
        // If already logged in and trying to access login/register, redirect to dashboard or home
        next('/dashboard') // Or next('/') if you prefer home
    } else {
        // Allow navigation
        next()
    }
})

export default router // Export the configured router instance
