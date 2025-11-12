import axios from 'axios';

// Create an instance of axios with default configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor (optional)
apiClient.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
apiClient.interceptors.response.use(
  (response) => {
    return response.data; // Return only the data from the response
  },
  (error) => {
    // Handle errors globally
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Example API methods
export const login = (credentials) => apiClient.post('/token', credentials);
export const signup = (userData) => apiClient.post('/signup', userData);
export const getDashboardData = () => apiClient.get('/dashboard');

// Token API method - FastAPI expects form data for OAuth2PasswordRequestForm
export const getToken = async (credentials) => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', credentials.email); // OAuth2 uses 'username' field
    formData.append('password', credentials.password);

    const response = await axios.post('http://localhost:8000/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Store tokens in localStorage
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
    }

    return {
      success: true,
      token: response.data.access_token,
      refresh_token: response.data.refresh_token,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.detail || 'Login failed',
    };
  }
};

// Registration API method
export const register = async (userData) => {
  try {
    const response = await apiClient.post('/register/', userData);
    
    return {
      success: true,
      user: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.detail || 'Registration failed',
    };
  }
};

export default apiClient;