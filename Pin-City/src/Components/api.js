import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
});

api.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        // const refreshToken = localStorage.getItem('refreshToken');

         const response = await axios.post('http://localhost:8000', {}, { withCredentials: true });
        
        const newAccessToken = response.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        console.error("Refresh token expired too! Kicking user out to login.");

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/'; // Bounce them to the login screen
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;