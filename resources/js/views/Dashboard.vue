<template>
  <div class="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
    <div class="border-b pb-4 mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p class="text-gray-600 mt-2">Welcome, {{ user?.name }}!</p>
    </div>

    <nav class="mb-8">
      <router-link 
        to="/posts" 
        class="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-md transition duration-200 ease-in-out shadow-sm"
      >
        <span>Posts</span>
      </router-link>
    </nav>

    <button 
      @click="logout" 
      class="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-md transition duration-200 ease-in-out shadow-sm"
    >
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
.router-link-active {
  @apply bg-blue-600;
}
</style>
