import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '../types/ApiResponse';

class AuthService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}`,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async register<T>(data: T): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post('/auth/', data);
      return { data: response.data, status: response.status, message: 'Success' };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw {
          data: error.response.data,
          status: error.response.status,
          message: error.response.data?.detail || error.response.statusText,
        };
      }
      throw {
        data: null,
        status: 0,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }

  async login<T>(data: any): Promise<ApiResponse> {
    try {
      const formData = new FormData();
      formData.append('username', data.email);
      formData.append('password', data.password);

      const response: AxiosResponse<T> = await this.axiosInstance.post('/auth/login/', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return { data: response.data, status: response.status, message: 'Login successfully' };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw {
          data: error.response.data,
          status: error.response.status,
          message: error.response.data?.detail || error.response.statusText,
        };
      }
      throw {
        data: null,
        status: 0,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }

  async getCurrentUser<T>(): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get('/auth/me/');
      return { data: response.data, status: response.status, message: 'User is authenticated' };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw {
          data: error.response.data,
          status: error.response.status,
          message: error.response.data?.detail || error.response.statusText,
        };
      }
      throw {
        data: null,
        status: 0,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }

  async logout<T>(): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post('/auth/logout/');
      return { data: response.data, status: response.status, message: 'Logged Out' };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw {
          data: error.response.data,
          status: error.response.status,
          message: error.response.data?.detail || error.response.statusText,
        };
      }
      throw {
        data: null,
        status: 0,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }
}

export default AuthService;
