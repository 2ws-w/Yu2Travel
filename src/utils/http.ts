// import axios from 'axios'

// const defaultConfig = {
//     baseUrl: '',
//     timeout: 1500,
// }
// const axiosInstance = axios.create(defaultConfig)
// // 请求拦截
// axiosInstance.interceptors.request.use(config => {
//     return config
// }, err => {
//     return Promise.reject(err)
// })
// //响应拦截
// axiosInstance.interceptors.response.use(config => {
//     return config
// }, err => {
//     return Promise.reject(err)
// })

// //封装请求
// const HttpRequest = (url, params) => {
//     return axiosInstance.get(url, params).then(res => res.data).catch()
// }
// const HttpRequestPost = (url, params) => {
//     return axiosInstance.post(url, params).then(res => res.data).catch()
// }
// export default { HttpRequest, HttpRequestPost }

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
const defaultConfig = {
    baseURL: import.meta.env.PROD ? '': 'http://localhost:5173',
    timeout: 1500,
}
class Http {
    constructor() {
        this.HttpInterceptorsRequest()
        this.HttpInterceptorsResponse()
    }
    private static axiosInstance = axios.create(defaultConfig)
    // 请求拦截
    private HttpInterceptorsRequest() {
        Http.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
            return config
        }, err => {
            return Promise.reject(err)
        })
    }
    //响应拦截
    private HttpInterceptorsResponse() {
        Http.axiosInstance.interceptors.response.use((config: AxiosResponse) => {
            return config
        }, err => {
            return Promise.reject(err)
        })
    }

    //封装请求
    //get
    public httpGet<T>(url: string, params: AxiosRequestConfig): Promise<T> {
        return Http.axiosInstance.get(url, {params}).then(res => res.data).catch()
    }
    //post
    public httpPost<T>(url: string, params: AxiosRequestConfig): Promise<T> {
        return Http.axiosInstance.post(url, params).then(res => res.data).catch()
    }
}

export const http = new Http() 