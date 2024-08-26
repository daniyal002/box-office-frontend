import { getAccessToken, getRefreshToken, removeAccessTokenFromStorage, removeRefreshTokenFromStorage, saveAccessToken } from '@/services/auth-token.service';
import { authService } from '@/services/auth.service';
import axios, { type CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
    baseURL: "http://localhost:3002",
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
                return window.location.replace("/login");
            }

            try {
                const { accessToken } = await authService.refresh({refreshToken:refreshToken});
                saveAccessToken(accessToken);

                // Обновляем заголовок оригинального запроса с новым access_token
                // originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

                // Повторяем оригинальный запрос с новым токеном
                return axiosWidthAuth(originalRequest);
            } catch (refreshError) {
                console.error("Error during token refresh:", refreshError);
                removeAccessTokenFromStorage();
                removeRefreshTokenFromStorage();
                return window.location.replace("/login");
            }
        }

        return Promise.reject(error);
    }
);
export { axiosClassic, axiosWidthAuth };
