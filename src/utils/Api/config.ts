import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import store from '../../store';
import { showLoader, hideLoader } from '../../store/ui';

// Create base API configuration
const baseConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : 'http://127.0.0.1:8000/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
};

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create(baseConfig);

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        // Set Axios Defaults
        axios.defaults.withCredentials = true; // Include cookies in requests
        axios.defaults.xsrfCookieName = 'csrftoken'; // Cookie name where CSRF token is stored
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'; // Header name to send the token

        // Show loader if showLoader flag is true
        if (config?.loader) {
            console.log('show loader');
            store.dispatch(showLoader());
        }

        // If token exists, add it to headers
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        if (error.config?.loader) {
            store.dispatch(hideLoader());
        }
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.config?.loader) {
            store.dispatch(hideLoader());
        }
        return response;
    },
    (error) => {
        if (error.config?.loader) {
            store.dispatch(hideLoader());
        }

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized
                    // localStorage.removeItem('token');
                    // window.location.href = '/login';
                    break;
                case 403:
                    // Handle forbidden
                    break;
                case 500:
                    // Handle server error
                    break;
            }
        }
        return Promise.reject(error);
    }
);

// Extend AxiosRequestConfig to include showLoader flag
declare module 'axios' {
    export interface AxiosRequestConfig {
        loader?: boolean;
    }
}

// Export the configured instance
export default axiosInstance;
