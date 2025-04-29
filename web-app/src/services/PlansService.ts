import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '../types/ApiResponse';

class PlansService {
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

  async get_plans<T>(): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get('/plans/');
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
}

export default PlansService;
