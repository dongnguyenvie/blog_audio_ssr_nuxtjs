import axios, { AxiosRequestConfig } from 'axios'
import { authencation } from '~/utils/authentication'
import { API_URL } from '~/utils/contants'

class RequestApi {
  _instance = axios.create({
    baseURL: API_URL,
    timeout: 60000,
  })

  constructor() {
    // Ref https://github.com/axios/axios#interceptors
    this._instance.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        const token = authencation.getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this._instance.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
      }
    )
  }

  getUri(config?: AxiosRequestConfig) {
    return this._instance.getUri(config)
  }

  request(config: AxiosRequestConfig) {
    return this._instance.request(config)
  }

  async get(url: string, config?: AxiosRequestConfig) {
    const result = await this._instance.get(url, config)
    return result.data
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this._instance.delete(url, config)
  }

  head(url: string, config?: AxiosRequestConfig) {
    return this._instance.head(url, config)
  }

  options(url: string, config?: AxiosRequestConfig) {
    return this._instance.options(url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._instance.post(url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._instance.put(url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._instance.patch(url, data, config)
  }

  static getInstance() {
    return new RequestApi()
  }

  getAxios() {
    return this._instance
  }
}

export const requestAPI = RequestApi.getInstance()
