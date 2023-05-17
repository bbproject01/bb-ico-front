import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = 'http://110.238.83.101:4100'; // process.env.BACKEND_API_NFT;
// axiosInstance.defaults.baseURL = 'http://localhost:4001'; // process.env.BACKEND_API_NFT;
export default axiosInstance;
