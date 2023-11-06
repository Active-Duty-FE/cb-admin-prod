import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { AppAxiosRequestConfig, AppCreateAxiosDefaults, AppInternalAxiosRequestConfig } from './config'
import { tokenCrypto } from '@/utils/crypto'
import store from '@/store'
import { updateMetaSlice } from '@/store/modules/meta'

export class AppRequest {
  private instance: AxiosInstance
  constructor(config: AppCreateAxiosDefaults) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      (config: AppInternalAxiosRequestConfig) => {
        let token = window.localStorage.getItem('token')
        if (!!token) {
          const data = tokenCrypto.decrypt(token, 'my-token')
          config.headers.setAuthorization(data.token)
        }
        return config
      }
      // (error: any) => {
      //   console.log(error)
      // }
    )
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const meta = res.data.meta
        const regex = /获取/
        if (!regex.test(meta.msg)) {
          store.dispatch(updateMetaSlice({ ...meta, switch: !store.getState().metaSlice.switch }))
        }
        return res
      },
      (error: any) => {
        console.log(error, 'interceptor response err catch')
      }
    )
    this.instance.interceptors.request.use(
      config.interceptors?.onRequestFulfilled,
      config.interceptors?.onRequestRejected
    )
    this.instance.interceptors.response.use(
      config.interceptors?.onResponseFulfilled,
      config.interceptors?.onResponseRejected
    )
  }
  request<T>(config: AppAxiosRequestConfig) {
    if (config.interceptors?.onRequestFulfilled) {
      config = config.interceptors.onRequestFulfilled(config)
    }
    return this.instance.request<T>({
      ...config
    })
  }
  get<T>(url: string, config?: AppAxiosRequestConfig) {
    return this.request<T>({
      url,
      method: 'get',
      ...config
    })
  }
  post<T>(url: string, config?: AppAxiosRequestConfig) {
    return this.request<T>({
      url,
      method: 'post',
      ...config
    })
  }
  put<T>(url: string, config?: AppAxiosRequestConfig) {
    return this.request<T>({
      url,
      method: 'put',
      ...config
    })
  }
  delete<T>(url: string, config?: AppAxiosRequestConfig) {
    return this.request<T>({
      url,
      method: 'delete',
      ...config
    })
  }
}
