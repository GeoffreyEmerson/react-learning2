import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json'; // this is the default, used here as an example

axios.interceptors.request.use(config => {
    console.log('Config in interceptor:',config);
    return config;
}, error => {
    console.log('Error in the interceptor:',error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log('Response in interceptor:',response);
    return response;
}, error => {
    console.log('Error in the interceptor:',error);
    return Promise.reject(error);
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
