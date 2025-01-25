import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// Interface and initial state
interface AuthState {
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  // On app load, check localStorage for a stored token
  token: localStorage.getItem("token"),
  isAuthenticated: Boolean(localStorage.getItem("token")),
  loading: false,
  error: null,
}

// Get the base URL from the environment variable
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"

// Async actions
export const login = createAsyncThunk("auth/login", async (credentials: { username: string; password: string }) => {
  const response = await axios.post(`${apiBaseUrl}/auth/login`, credentials)
  return response.data.token // Returns the token from the login response
})

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: { username: string; password: string }) => {
    const response = await axios.post(`${apiBaseUrl}/auth/register`, credentials)
    return response.data.token // Returns the token from the registration response
  },
)

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token") // Remove the token from localStorage
      state.token = null
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.token = action.payload
        localStorage.setItem("token", action.payload) // Store the token in localStorage
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Login failed"
      })
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.token = action.payload
        localStorage.setItem("token", action.payload) // Store the token in localStorage
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Registration failed"
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
