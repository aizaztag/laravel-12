<template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <p class="mb-4">Welcome, {{ user?.name }}!</p>

    <nav class="mb-6">
      <router-link to="/posts" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-4">
        Posts
      </router-link>
    </nav>

    <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
      Logout
    </button>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  name: 'Dashboard',
  data() {
    return {
      user: null
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push('/login')
        return
      }

      try {
        const response = await axios.get('/api/user')
        this.user = response.data
      } catch (error) {
        console.error('Failed to fetch user:', error.response?.data || error.message)
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    },
    async logout() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push('/login')
        return
      }

      try {
        await axios.post('/api/logout')
        localStorage.removeItem('token')
        this.$router.push('/login')
      } catch (error) {
        console.error('Logout failed:', error.response?.data || error.message)
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
</style>
