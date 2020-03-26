import Axios from 'axios';

const api = Axios.create({
    baseURL: 'http://192.168.100.122:3333',
})

export default api;