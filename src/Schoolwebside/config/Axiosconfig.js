import axios from 'axios';

import { toast } from 'react-toastify';



  // Read base URL from environment (Create React App exposes variables prefixed with REACT_APP_)
  const apiUrl = process.env.REACT_APP_API_BASE_URL ;
  console.log('API base URL:', apiUrl);

    const axiosInstance = axios.create({
      baseURL: apiUrl,
      timeout: 10000,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const response = error.response;
        const status = response?.status;
        const currentPath = window.location.pathname;
        const isLoginRoute = currentPath === '/login';

        const authFailure =
          status === 401 ||
          status === 403 ||
          response?.data?.message === 'Unauthenticated' ||
          response?.data?.msg === 'Unauthenticated';

        if (authFailure && !isLoginRoute) {
          toast.error('Unauthorized access. Please log in again.');
          localStorage.removeItem('flag');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        if (!response) {
          toast.error('Network error. Please check your connection.');
          return Promise.reject(error);
        }

        const data = response?.data ?? error?.errors ?? {};

        if (data && data.errors) {
          const errors = Array.isArray(data.errors)
            ? data.errors
            : Object.values(data.errors).flat();
          errors.forEach((msg) => {
            if (typeof msg === 'string') toast.error(msg);
            else if (msg?.message) toast.error(msg.message);
          });
        } else if (data?.msg) {
          toast.error(data.msg);
        } else if (data?.message) {
          toast.error(data.message);
        } else {
          toast.error('An error occurred');
        }

        return Promise.reject(error);
      }
    );

    export default axiosInstance;

   