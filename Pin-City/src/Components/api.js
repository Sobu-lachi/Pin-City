import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
});
// const authRoutes = ['/Login', '/SignUp'];

api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {

        const originalRequest = error.config;

        if (error.response?.status === 401 
            && !originalRequest._retry
            && originalRequest.url !== '/Login'
            && originalRequest.url !== '/SignUp') {

            try {

                await axios.post(
                    'http://localhost:8000/refresh',
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