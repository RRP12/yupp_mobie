import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { router } from "expo-router"
import * as SecureStore from "expo-secure-store"

// Base URL for API
// For mobile development, use your computer's IP address instead of localhost
// Find your IP with: ifconfig (Mac) or ipconfig (Windows)
// const BASE_URL = "http://192.168.1.100:3000/api/v1" // Replace 192.168.1.100 with your actual IP
// Note: Using network IP for device/simulator access
const BASE_URL = "http://192.168.1.100:3000/api/v1" // Replace with your actual IP
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

// Create a separate axios instance for refresh calls (no interceptors to avoid loops)
const refreshApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Function to refresh token (using separate axios instance)
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    console.log("🔄 Starting token refresh process...")
    const refreshToken = await getRefreshToken()

    if (!refreshToken) {
      console.log("❌ No refresh token found in storage")
      return null
    }

    console.log("📡 Calling refresh token endpoint...")
    // Use refreshApi (no interceptors) to avoid infinite loops
    const response = await refreshApi.post("/auth/refresh-token", {
      refreshToken,
    })

    console.log(
      "📋 Refresh token response:",
      JSON.stringify(response.data, null, 2)
    )

    // Handle different possible response formats
    let accessToken, newRefreshToken

    if (response.data?.data) {
      // Format: { data: { accessToken, refreshToken } }
      accessToken = response.data.data.accessToken
      newRefreshToken = response.data.data.refreshToken
    } else if (response.data?.accessToken) {
      // Format: { accessToken, refreshToken }
      accessToken = response.data.accessToken
      newRefreshToken = response.data.refreshToken
    } else {
      console.log("❌ Invalid response format from refresh endpoint")
      console.log(
        "Expected: { data: { accessToken, refreshToken } } or { accessToken, refreshToken }"
      )
      return null
    }

    if (accessToken && newRefreshToken) {
      console.log("✅ New tokens received, storing them...")
      await storeTokens({ accessToken, refreshToken: newRefreshToken })
      console.log("💾 New tokens stored successfully")
      return accessToken
    }

    console.log("❌ Missing tokens in response")
    return null
  } catch (error) {
    console.error("❌ Error refreshing token:", error)
    console.log("🧹 Cleaning up tokens and redirecting to login...")

    await removeTokens()
    router.replace("/(auth)/login")
    return null
  }
}

// Request queue management for proper refresh token handling
let isRefreshing = false
let failedQueue: {
  resolve: (token: string) => void
  reject: (error: any) => void
}[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token!)
    }
  })
  failedQueue = []
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
    console.log(
      "🔴 Interceptor caught error:",
      error.response?.status,
      error.config?.url
    )
    console.log("🔍 Error response data:", error.response?.data)

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      console.log(
        "🔄 Starting token refresh for",
        error.response?.status,
        "error"
      )
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers!.Authorization = `Bearer ${token}`
              resolve(api(originalRequest))
            },
            reject: (err: any) => {
              reject(err)
            },
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = await getRefreshToken()
        if (!refreshToken) {
          throw new Error("No refresh token")
        }

        const response = await refreshApi.post("/auth/refresh-token", {
          refreshToken,
        })

        const { accessToken, refreshToken: newRefreshToken } = response.data
        await storeTokens({ accessToken, refreshToken: newRefreshToken })

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
        originalRequest.headers!.Authorization = `Bearer ${accessToken}`

        processQueue(null, accessToken)
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        await removeTokens()
        router.replace("/(auth)/login")
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
