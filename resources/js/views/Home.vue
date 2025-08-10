<template>
  <div class="home">
    <h1>Welcome to the Home Page</h1>
    <p>This is a public page accessible to everyone.</p>
    <router-link v-if="!isLoggedIn" to="/login" class="btn">Login</router-link>
    <router-link v-if="!isLoggedIn" to="/register" class="btn">Register</router-link>
    <router-link v-if="isLoggedIn" to="/dashboard" class="btn">Go to Dashboard</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    }
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

.btn {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background: #3490dc;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>
