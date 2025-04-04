import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // eller din API-bas-URL
  withCredentials: true, // Viktigt för att cookies ska skickas
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Response interceptor för att hantera auth-fel
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Automatisk redirect till login vid auth-fel
      console.log('Authentication error - redirecting to login');
      
      // Alternativ 1: Omdirigera med window.location (enklare)
      // window.location.href = '/login';
      
      // Alternativ 2: Spara en global flagga för att visa att auth misslyckades
      // store.dispatch({ type: 'AUTH_ERROR' });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

