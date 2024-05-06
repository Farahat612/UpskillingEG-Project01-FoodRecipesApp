import axios from 'axios'

const baseURL = 'https://upskilling-egypt.com:3006/api/v1'
const staticURL = 'https://upskilling-egypt.com:3006'
const token = `Bearer ${localStorage.getItem('token')}`

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
  headers: {
    // 'Content-Type': 'application/json',
    Authorization: token,
  },
})

export { apiPublic, apiProtected, baseURL, staticURL }
