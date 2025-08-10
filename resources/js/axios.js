import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'  // Laravel backend
axios.defaults.withCredentials = true            // Required for Sanctum

export default axios
