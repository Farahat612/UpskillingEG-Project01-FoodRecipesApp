import axios from 'axios'

const baseURL = 'https://upskilling-egypt.com:3006/api/v1'
const staticURL = 'https://upskilling-egypt.com:3006'


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
