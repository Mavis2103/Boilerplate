import {env} from 'env';
import {Platform} from 'react-native';
import axios, {AxiosRequestConfig} from 'axios';

import type {AxiosResponse} from 'axios';

const instance = axios.create({
  baseURL: env.BASE_URL,
  timeout: 300000,
  headers: {
    'Content-type': 'application/json',
  },
});

//if the platform is web -> token auto send by browser cookie HttpOnly
/* Checking if the platform is not web. */
if (Platform.OS !== 'web') {
  import('./mmkvConfig.native').then(({MMKV}) => {
    instance.interceptors.request.use(
      (req: AxiosRequestConfig): any => {
        /* Trying to get the token from the local storage and then send a request to the server to get a new
      token. */
        // const token = MMKV.getMap('token');
        // if (token && req.headers) {
        //   // req.headers['x-access-token'] = token;
        // }
        return req;
      },
      error => {
        return Promise.reject(error);
      },
    );

    instance.interceptors.response.use(
      (response: AxiosResponse<any, any>): any => {
        const {code} = response.data;
        /* Trying to get the token from the local storage and then send a request to the server to get a
        new token. */
        // if (code === 401) {
        //   const token = MMKV.getMap('token');
        //   return instance
        //     .post('/token', {
        //       refreshToken: token?.refreshToken,
        //     })
        //     .then(rs => {
        //       const {token} = rs.data;
        //       const config = response.config;
        //       if (config.headers && token) {
        //         config.headers['x-access-token'] = token;
        //       }
        //       config.baseURL = env.BASE_URL;
        //       return instance(config);
        //     });
        // }
        return response;
      },
      error => {
        console.error(`Error status: ${error.message.data}`);
        Promise.reject(error);
      },
    );
  });
}

export default instance;
