import axios from 'axios';

const API = axios.create({
  baseURL: 'https://www.mockachino.com/06c67c77-18c4-45',
});

/* API.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  };
}); */
export default API;
