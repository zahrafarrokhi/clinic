import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    common: {
      'Accept-Language': 'ir',
    },
  },
});

export const setupInterceptors = (store) => {
  createAuthRefreshInterceptor(axiosInstance, (failedRequest) => axiosInstance
    .post('/api/auth/token/refresh/', {
      user_id: store.getState().authReducer?.username,
      refresh: store.getState().authReducer?.refresh,
    })
    .then((resp) => {
      const { access: accessToken } = resp.data;
      const bearer = `${
        process.env.JWT_AUTH_HEADER ?? 'Bearer'
      } ${accessToken}`;
      console.log(accessToken);
      axiosInstance.defaults.headers.common.Authorization = bearer;

      failedRequest.response.config.headers.Authorization = bearer;
      return Promise.resolve();
    }), { statusCodes: [401, 403] });
};

// Create axios interceptor
export default axiosInstance;
