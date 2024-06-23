import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL
const staticURL = import.meta.env.VITE_STATIC_URL

// axios instance without token
const apiPublic = axios.create({
  baseURL,
  headers: {
    // 'Content-Type': 'application/json',
  },
})

// axios instance with token
const apiProtected = axios.create({
  baseURL,
})
apiProtected.interceptors.request.use((config) => {
  const token = `Bearer ${localStorage.getItem('token')}`
  config.headers.Authorization = token

  return config
})

export { apiPublic, apiProtected, baseURL, staticURL }
