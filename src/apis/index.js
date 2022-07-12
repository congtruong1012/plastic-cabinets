import axios from 'axios';
import { refreshToken } from './auth';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  async function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const status = response.data.status;
    const message = response.data.message;
    const originalRequest = response.config;
    if (status && status !== 200) {
      if (status === 401) {
        if (message === 'TokenExpiredError') {
          // originalRequest._retry = true;
          // refreshTokenRequest = refreshTokenRequest ? refreshTokenRequest : goToRefreshToken(originalRequest);
          // await refreshTokenRequest;
          // refreshTokenRequest = null;
          if (isRefreshing) {
            return new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                return axiosClient(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }
          isRefreshing = true;

          return new Promise(function (resolve, reject) {
            refreshToken()
              .then(() => {
                processQueue(null);
                resolve(axiosClient(originalRequest));
              })
              .catch((err) => {
                processQueue(err);
                reject(err);
              })
              .finally(() => {
                isRefreshing = false;
              });
          });
        } else {
          window.location.href = '/login';
        }
      }
      return Promise.reject(response.data);
    }
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default axiosClient;
