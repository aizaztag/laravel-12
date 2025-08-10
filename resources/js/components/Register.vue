<template>
  <form @submit.prevent="register">
    <input v-model="form.name" type="text" placeholder="Name" required />
    <input v-model="form.email" type="email" placeholder="Email" required />
    <input v-model="form.password" type="password" placeholder="Password" required />
    <input v-model="form.password_confirmation" type="password" placeholder="Confirm Password" required />
    <button type="submit">Register</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  methods: {
    async register() {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/register', this.form)
      this.$router.push('/dashboard')
    },
  },
}
</script>
