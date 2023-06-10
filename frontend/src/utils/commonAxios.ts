import axios from 'axios';

const commonAxios = axios.create({
    baseURL: 'http://localhost:3000',
    //'http://ec2-54-180-29-166.ap-northeast-2.compute.amazonaws.com:3000/',
    withCredentials: true,
});

// unauthorized handling (401) - redirect to login page
commonAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            window.location.href = '/';
            return;
        }

        return Promise.reject(error);
    }
);

export { commonAxios };
