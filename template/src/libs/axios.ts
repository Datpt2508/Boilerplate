/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log(error.response.status);
      return Promise.reject({});
    }
    if (error.request) {
      console.log(error);
      return Promise.reject({});
    }
    return Promise.reject({});
  },
);

export const getApi = (url: string, data?: any): Promise<any> =>
  axiosInstance
    .get(url, {
      params: data,
    })
    .then((response: AxiosResponse) => response.data)
    .catch((error) => error);

export const postApi = (
  url: string,
  data: any,
  headers: any = {},
): Promise<any> =>
  axiosInstance
    .post(url, data, headers)
    .then((response: AxiosResponse) => response.data)
    .catch((error) => error);

export const putApi = (url: string, data: any): Promise<any> =>
  axiosInstance
    .put(url, data)
    .then((response: AxiosResponse) => response.data)
    .catch((error) => error);

export const patchApi = (url: string, data: any): Promise<any> =>
  axiosInstance
    .patch(url, data)
    .then((response: AxiosResponse) => response.data)
    .catch((error) => error);

export const deleteApi = (url: string): Promise<any> =>
  axiosInstance
    .delete(url)
    .then((response: AxiosResponse) => response.data)
    .catch((error) => error);

export const uploadApi = (url: string, data: FormData): Promise<any> =>
  axiosInstance
    .post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response: AxiosResponse) => response.data);

export default axiosInstance;
