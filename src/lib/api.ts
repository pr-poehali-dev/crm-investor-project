import axios, { AxiosError } from 'axios';
import type { RegisterDto, LoginDto, VerifyEmailDto, TokenResponseDto, UserDto, SessionDto } from '@/types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/rest';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error: Backend недоступен на', API_BASE_URL);
      return Promise.reject({
        response: {
          data: { message: 'Не удается подключиться к серверу. Проверьте что backend запущен на ' + API_BASE_URL },
          status: 0,
        },
      });
    }
    
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const { data } = await axios.post<TokenResponseDto>(`${API_BASE_URL}/auth/refresh`, {
            refreshToken
          });
          
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          
          if (originalRequest) {
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (data: RegisterDto) => 
    api.post('/auth/register', data),
  
  verifyEmail: (data: VerifyEmailDto) => 
    api.post('/auth/verify-email', data),
  
  resendCode: (email: string) => 
    api.post('/auth/resend-verification-code', { email }),
  
  login: (data: LoginDto) => 
    api.post<TokenResponseDto>('/auth/login', data),
  
  refresh: (refreshToken: string) => 
    api.post<TokenResponseDto>('/auth/refresh', { refreshToken }),
  
  getMe: () => 
    api.get<UserDto>('/auth/me'),
  
  getSessions: () => 
    api.get<SessionDto[]>('/auth/sessions'),
  
  deleteSession: (sessionId: number) => 
    api.delete(`/auth/sessions/${sessionId}`),
};

export default api;