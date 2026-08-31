import axios from "axios";

const api = axios.create({
    baseURL: '',
    withCredentials: true
});
// const authRoutes = ['/login', '/signup'];

api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {

        const originalRequest = error.config;

        if (error.response?.status === 401 
            && !originalRequest._retry
            && originalRequest.url !== '/api/login'
            && originalRequest.url !== '/api/signup') {

            try {

                await axios.post(
                    '/api/refresh',
                    {},
                    {
                        withCredentials: true
                    }
                );

                return api(originalRequest);

            } catch (refreshError) {

                console.error(
                    "Refresh token expired. User must log in again."
                );
                 window.location.href = '/';

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;