import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'

const baseURL = import.meta.env.VITE_API_URL

// Use this hook inside React components to get an auth-aware API client
export function useApi() {
  const { getToken } = useAuth()

  const api = axios.create({ baseURL })

  // Attach Clerk JWT to every request automatically
  api.interceptors.request.use(async (config) => {
    const token = await getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  return api
}