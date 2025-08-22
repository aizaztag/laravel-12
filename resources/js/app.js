import { createApp } from 'vue'
import router from './router' // Import the router from the new index.js file
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = '/' // Ensure this is set correctly for API calls

const app = createApp({
  template: '<div><router-view /></div>'
})
app.use(router) // Use the imported router
app.mount('#app')
