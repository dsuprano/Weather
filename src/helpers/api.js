import axios from 'axios';
import { stringify } from 'qs';

import appConfig from 'config';

const API = axios.create({
  baseURL: appConfig.apiUrl,
  headers: {
    'X-Origin-Application': appConfig.appName,
    'Api-Version': appConfig.apiVersion,
  },
});

let cancelTokenSource = axios.CancelToken.source();
const init = (rootStore) => {
  const { authStore } = rootStore;

  API.interceptors.response.use(
    (response) => {
      const { data = {}, meta = {} } = response;
      const { token } = meta;

      if (token) {
        // Renew Json Web Token
        authStore.setToken(token.access_token);
      }

      return data;
    },
    (responseError) => {
      if (axios.isCancel(responseError)) {
        return Promise.reject({ code: 'cancelled' });
      }

      const { response, request } = responseError;

      if (response) {
        const { status, data = {} } = response;
        const { error = {} } = data;
        switch (true) {
          case status === 401:
            // Unauthorized
            return Promise.reject(error);
          case status === 403:
            // Forbidden
            return Promise.reject(error);
          case status >= 400 && status < 500:
            // Client error
            return Promise.reject(error);
          default:
          case status >= 500:
            // Server error
            console.error('Server error 500');
        }
      } else if (request) {
        return Promise.reject({ code: 'networkError' });
      } else {
        console.error('Error');
      }

      return Promise.reject(responseError);
    },
  );

  // Cancelable requests
  API.interceptors.request.use((config) => {
    /* eslint-disable no-param-reassign */
    config.headers.Accept = 'application/json';

    const { token } = authStore;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (typeof config.cancelToken === 'undefined') {
      config.cancelToken = cancelTokenSource.token;
    }

    config.paramsSerializer = (params) => {
      return stringify(params, {
        arrayFormat: 'brackets',
        encode: true,
      });
    };

    return config;
    /* eslint-enable no-param-reassign */
  });
};

const cancelPromises = () => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel();
    cancelTokenSource = axios.CancelToken.source();
  }
};

API.cancelPromises = cancelPromises;
API.init = init;
export default API;
