import axios from 'axios';
const httpClient = axios.create({
  baseURL: '', //remoteServiceBaseUrl
  timeout: 300000,
});

export default httpClient;
