import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import store from '../../store';
import { showLoader, hideLoader } from '../../store/ui';

// Extend AxiosRequestConfig to include showLoader flag
declare module 'axios' {
    export interface AxiosRequestConfig {
        loader?: boolean;
        retry?: number;
        retryDelay?: number;
    }
}

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
    async (error) => {
        if (error.config?.loader) {
            store.dispatch(hideLoader());
        }

        // Log the error
        console.error(error);

        if (!error.response) {
            console.error('Network Error:', error.message);
            return Promise.reject(new Error('Network Error: Please check your connection.'));
        }

        const config = error.config;

        // Check if the request is retryable
        if (!config || !config.retry) {
            return Promise.reject(error);
        }

        // Check for specific status codes to avoid retrying
        if (error.response && [401, 403].includes(error.response.status)) {
            // Handle unauthorized or forbidden errors
            return Promise.reject(error);
        }

        // Initialize retry count if not already set
        config.__retryCount = config.__retryCount || 0;

        // Check if the maximum retry count has been reached
        const maxRetries = config.retry || 1; // Default to 1 retries
        if (config.__retryCount >= maxRetries) {
            console.error('Max retries reached.');
            return Promise.reject(error);
        }

        // Increment retry count
        config.__retryCount += 1;

        // Wait for a backoff period before retrying
        const backoff = new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, config.retryDelay || 1000);
        });

        await backoff;

        // Retry the request
        return axiosInstance(config);
    }
);



// Default retry and retryDelay configuration for all requests
axiosInstance.defaults.retry = 3; // Max 3 retries
axiosInstance.defaults.retryDelay = 1000; // 1-second delay between retries

// Export the configured instance
export default axiosInstance;
