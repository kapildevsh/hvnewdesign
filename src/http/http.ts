import axios from 'axios';

// axios.defaults.baseURL = '/api';

export const HTTP = axios.create({
    baseURL: `http://localhost:8000/api`,
    
  })
// Add a request interceptor
HTTP.interceptors.request.use(function (config) {
    // Do something before request is sent
    const sessionRaw = localStorage.getItem('user');
    debugger;
    if(sessionRaw){
      const session = JSON.parse(sessionRaw);
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
HTTP.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response.data.data.token){
        localStorage.setItem('token',response.data.data.token);
        localStorage.setItem('user',JSON.stringify(response.data.data))
    }
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  export default HTTP;