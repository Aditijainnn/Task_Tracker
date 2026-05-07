import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANT: Change this to your machine's IP address
// Find your IP: On Mac/Linux run `ipconfig getifaddr en0` or `hostname -I`
// Your phone must be on the same WiFi network as your computer
const API_BASE_URL = 'http://10.12.26.185:5000/api';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: async (name: string, email: string, password: string, confirmPassword: string) => {
    const response = await apiClient.post('/auth/signup', {
      name,
      email,
      password,
      confirmPassword,
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },
};

// Tasks API
export const tasksAPI = {
  getTasks: async () => {
    const response = await apiClient.get('/tasks');
    return response.data;
  },

  createTask: async (title: string, description: string, priority: string) => {
    const response = await apiClient.post('/tasks', {
      title,
      description,
      priority,
    });
    return response.data;
  },

  updateTask: async (id: string, updates: Partial<{
    title: string;
    description: string;
    completed: boolean;
    priority: string;
  }>) => {
    const response = await apiClient.put(`/tasks/${id}`, updates);
    return response.data;
  },

  deleteTask: async (id: string) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default apiClient;
