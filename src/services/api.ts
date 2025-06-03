import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { API_ENDPOINT } from '../constants';
import { refreshAccessTokenApi } from './account';
import queryString from 'query-string';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class ApiService {
  session: AxiosInstance;

  constructor(enforcer: typeof singletonEnforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    this.session = axios.create({
      baseURL: API_ENDPOINT,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      paramsSerializer: (params) =>
        queryString.stringify(params, {
          skipNull: true,
          skipEmptyString: true,
        }),
    });

    this.session.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError): Promise<any> => {
        const originalRequest = error.config as any;
        const status = error.response?.status;
        const data = error.response?.data as { statusCode?: string; error?: string; message?: string };

        const isLoginRequest = originalRequest?.url?.includes('/');

        if (status === 401 && !originalRequest?._retry && !isLoginRequest) {
          originalRequest._retry = true;

          const refreshToken = window.localStorage.getItem('refresh_token');
          if (!refreshToken) {
            this.logout();
            return Promise.reject(error);
          }

          try {
            const dt = await refreshAccessTokenApi(refreshToken);
            window.localStorage.setItem('access_token', dt.access_token);
            window.localStorage.setItem('refresh_token', dt.refresh_token);

            this.authorization(dt.access_token);
            originalRequest.headers.Authorization = `Bearer ${dt.access_token}`;

            return this.session(originalRequest);
          } catch (refreshError) {
            this.logout();
            return Promise.reject(refreshError);
          }
        }

        if (data?.message) {
          toast.error(data.message);
        } else if (data?.statusCode) {
          toast.error(data.statusCode);
        }
        else if (data?.error) {
          toast.error(data.error);
        } else {
          toast.error('default_error');
        }

        return Promise.reject(error);
      },
    );
  }

  static get instance(): ApiService {
    if (!(this as any)[singleton]) {
      (this as any)[singleton] = new ApiService(singletonEnforcer);
    }
    return (this as any)[singleton];
  }

  authorization(token: string) {
    this.session.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  logout(): void {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');

    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  }

  options: AxiosInstance['options'] = (...params) => this.session.options(...params);

  get: AxiosInstance['get'] = (...params) => this.session.get(...params);

  post: AxiosInstance['post'] = (...params) => this.session.post(...params);

  put: AxiosInstance['put'] = (...params) => this.session.put(...params);

  delete: AxiosInstance['delete'] = (...params) => this.session.delete(...params);

  patch: AxiosInstance['patch'] = (...params) => this.session.patch(...params);

  me(): Promise<AxiosResponse<{ data: Record<string, any> }>> {
    return this.get<{ data: Record<string, any> }>('/api/v1/auth/profile');
  }
}

export const MS_API = ApiService.instance;
