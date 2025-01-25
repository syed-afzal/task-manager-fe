import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import type { CheckList, Task } from "../types"

// Interface and initial state
interface TaskState {
  tasks: Task[]
  loading: boolean
  error: string | null
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
}

// Get the base URL from the environment variable
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"

// Get token from localStorage
const getAuthToken = (): string | null => localStorage.getItem("token")

// Set up axios instance with the token
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
})

// Add the token to the authorization header for every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Async actions
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axiosInstance.get("/tasks")
  return response.data
})

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task: { title: string; checklist: CheckList[] }) => {
    const response = await axiosInstance.post("/tasks", {
      title: task.title,
      checklist: task.checklist, // Sending the checklist with both text and isCompleted
    })
    return response.data
  }
)

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: { id: string; title: string; checklist: CheckList[] }) => {
    const response = await axiosInstance.put(`/tasks/${task.id}`, task)
    return response.data
  },
)

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id: string) => {
  await axiosInstance.delete(`/tasks/${id}`)
  return id
})

// Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch tasks"
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload)
      })
  },
})

export default taskSlice.reducer
