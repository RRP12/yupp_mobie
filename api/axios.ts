import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { router } from "expo-router"
import * as SecureStore from "expo-secure-store"

// Base URL for API
const BASE_URL = "http://localhost:3000/api/v1"
// Note: Using network IP for device/simulator access

// Main axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Token keys for secure storage
const ACCESS_TOKEN_KEY = "yupp_access_token"
const REFRESH_TOKEN_KEY = "yupp_refresh_token"

// Type definitions for tokens
interface TokenResponse {
  accessToken: string
  refreshToken: string
}

// Store tokens in secure storage
export const storeTokens = async (tokens: TokenResponse) => {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken)
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken)
  } catch (error) {
    console.error("Error storing tokens:", error)
  }
}

// Get access token from secure storage
export const getAccessToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
  } catch (error) {
    console.error("Error getting access token:", error)
    return null
  }
}

// Get refresh token from secure storage
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
  } catch (error) {
    console.error("Error getting refresh token:", error)
    return null
  }
}

// Remove tokens from secure storage
export const removeTokens = async () => {
  try {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
  } catch (error) {
    console.error("Error removing tokens:", error)
  }
}

// Function to refresh token
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await getRefreshToken()
    if (!refreshToken) return null

    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      refreshToken,
    })

    if (response.data?.data) {
      const { accessToken, refreshToken: newRefreshToken } = response.data.data
      await storeTokens({ accessToken, refreshToken: newRefreshToken })
      return accessToken
    }
    return null
  } catch (error) {
    console.error("Error refreshing token:", error)
    await removeTokens()
    router.replace("/(auth)/login")
    return null
  }
}

// Request interceptor to add authorization header
api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }

    // Handle 401 (Unauthorized) error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const newToken = await refreshAccessToken()
      if (newToken) {
        // Retry the original request with the new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
        } else {
          originalRequest.headers = { Authorization: `Bearer ${newToken}` }
        }
        return axios(originalRequest)
      }

      // If token refresh failed, redirect to login
      router.replace("/(auth)/login")
    }

    return Promise.reject(error)
  }
)

export default api
