import axios from 'axios';
// document.get()

const instance = axios.create({
    // baseURL: 'http://localhost:3000', // Ваш базовый URL сервера
    // baseURL: 'http://82.193.98.232:443/', // Ваш базовый URL сервера
});

// Добавляем интерсептор для добавления токена к каждому запросу
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        // console.log(token);
        if (token) {
            config.headers['Authorization'] = token;
        }
        // console.log(config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
