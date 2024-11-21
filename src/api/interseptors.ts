import { getAccessToken, getRefreshToken, removeAccessTokenFromStorage, removeRefreshTokenFromStorage, saveAccessToken } from '@/services/auth-token.service';
import { authService } from '@/services/auth.service';
import axios, { type CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
    // baseURL: "http://192.168.30.119:3002",
    baseURL: "http://176.124.208.40:3002",

    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true
};

const axiosClassic = axios.create(options);
const axiosWidthAuth = axios.create(options);

axiosWidthAuth.interceptors.request.use(config => {
    const accessToken = getAccessToken();
    if (config?.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axiosWidthAuth.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if ((error?.response?.status === 401 || error?.response?.status === 403) && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            const refreshToken = getRefreshToken();

            if (!refreshToken) {
                removeAccessTokenFromStorage();
                removeRefreshTokenFromStorage();
                if (typeof window !== 'undefined') {
                    window.location.replace("/login"); // Выполняется только на клиенте
                }
                return Promise.reject(error);
            }

            try {
                const { accessToken } = await authService.refresh({refreshToken: refreshToken});
                saveAccessToken(accessToken);

                // Повторяем оригинальный запрос с новым токеном
                return axiosWidthAuth(originalRequest);
            } catch (refreshError) {
                console.error("Error during token refresh:", refreshError);
                removeAccessTokenFromStorage();
                removeRefreshTokenFromStorage();
                if (typeof window !== 'undefined') {
                    window.location.replace("/login"); // Выполняется только на клиенте
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export { axiosClassic, axiosWidthAuth };
