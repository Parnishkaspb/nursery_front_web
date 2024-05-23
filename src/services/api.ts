import axios, { AxiosError } from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Замените на ваш API URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true, // Включает передачу и получение cookies
});

export default instance;
