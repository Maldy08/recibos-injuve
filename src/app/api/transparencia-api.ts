import axios from 'axios';


const transparenciaApi = axios.create({
    baseURL: 'http://localhost:5190/api-transparencia',
    
});

export default transparenciaApi;