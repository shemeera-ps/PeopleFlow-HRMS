import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Separate axios instance ONLY for refreshing access tokens
const refreshApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Add access token to normal API requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("auth_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let refreshPromise = null;

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Only handle 401 responses
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        // Don't retry the same request infinitely
        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            // If another request is already refreshing,
            // wait for that same refresh request
            if (!isRefreshing) {
                isRefreshing = true;

                refreshPromise = refreshApi
                    .post("/auth/refresh")
                    .then((response) => {
                        const newToken = response.data?.data?.token;

                        if (!newToken) {
                            throw new Error(
                                "New access token was not returned"
                            );
                        }

                        localStorage.setItem(
                            "auth_token",
                            newToken
                        );

                        return newToken;
                    })
                    .finally(() => {
                        isRefreshing = false;
                        refreshPromise = null;
                    });
            }

            const newToken = await refreshPromise;

            // Attach new token to original failed request
            originalRequest.headers.Authorization =
                `Bearer ${newToken}`;

            // Retry original request
            return api(originalRequest);

        } catch (refreshError) {
            // Refresh token is invalid/expired/revoked
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_user");

            window.location.href = "/";

            return Promise.reject(refreshError);
        }
    }
);

export { api, refreshApi };