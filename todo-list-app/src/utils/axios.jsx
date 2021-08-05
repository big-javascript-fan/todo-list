import axios from 'axios';

import APP_CONFIG from '../constants/config';

const { API_BASE_URL } = APP_CONFIG;

/* axios config for the whole app */
const AxiosRequestInterceptor = async (config) => {
  const configTemp = config;
  configTemp.headers = {
    'Content-Type': 'application/json',
    ...configTemp.headers,
  };

  return configTemp;
};

axios.defaults.timeout = 30000; // 30 seconds timeout
axios.defaults.baseURL = API_BASE_URL;
axios.interceptors.request.use(AxiosRequestInterceptor);
