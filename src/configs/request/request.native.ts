import {env} from 'env';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios';
import {MMKV} from '../mmkv.native';

import type {AxiosResponse} from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: env.BASE_URL,
  timeout: 300000,
  headers: {
    'Content-type': 'application/json',
  },
} as CreateAxiosDefaults);

//if the platform is web -> token auto send by browser cookie HttpOnly
/* Checking if the platform is not web. */
instance.interceptors.request.use(
  (req: AxiosRequestConfig): any => {
    /* Trying to get the token from the local storage and then send a request to the server to get a new
      token. */
    const accessToken = MMKV.getString('access-token');
    if (accessToken && req.headers) {
      req.headers['Authorization'] = accessToken;
    }
    return req;
  },
  error => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse<any, any>): any => {
    const {code} = response.data;
    /* Trying to get the token from the local storage and then send a request to the server to get a
        new token. */
    if (code === 401) {
      const refreshToken = MMKV.getString('refresh-token');
      return instance
        .post('/token', {
          refresh_token: refreshToken,
        })
        .then((rs: AxiosResponse) => {
          const token = rs.data;
          const config = response.config;
          if (config.headers && token) {
            config.headers['Authorization'] = token.access_token;
            MMKV.setString('refresh-token', token.refresh_token);
            MMKV.setString('access-token', token.access_token);
          }
          // config.baseURL = env.BASE_URL;
          return instance(config);
        });
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;
