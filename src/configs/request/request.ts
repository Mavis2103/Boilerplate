import {env} from 'env';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios';

import type {AxiosResponse} from 'axios';
import reactotron from 'reactotron-react-native';

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
    const accessToken = localStorage.getItem('access-token');
    if (accessToken && req.headers) {
      req.headers['Authorization'] = accessToken;
    }
    return req;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse<any, any>): any => {
    const {code} = response.data;
    /* Trying to get the token from the local storage and then send a request to the server to get a
        new token. */
    if (code === 401) {
      console.log('refresh');
      const refreshToken = localStorage.getItem('refresh-token');
      return instance
        .post('/token', {
          refresh_token: refreshToken,
        })
        .then((rs: AxiosResponse) => {
          const token = rs.data;
          const config = response.config;
          if (config.headers && token) {
            config.headers['Authorization'] = token.access_token;
            localStorage.setItem('refresh-token', token.refresh_token);
            localStorage.setItem('access-token', token.access_token);
          }
          // config.baseURL = env.BASE_URL;
          return instance(config);
        });
    }
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default instance;
